from ..models import Articulo, TipoArticulo
from ..serializers import ArticuloSerializer
from django.http import Http404
from django.conf import settings
from django.core.files.storage import default_storage
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework import status
from .common import crear_respuesta
import os
import uuid


class MuchosArticulos(APIView):
    def get(self, request: Request, format=None):
        articulos = Articulo.objects.all()
        serializer = ArticuloSerializer(articulos, many=True)
        return crear_respuesta("Artículos retornados exitosamente", serializer.data)

    def post(self, request: Request, format=None):
        try:
            nombre = request.data.get('nombre')
            descripcion = request.data.get('descripcion')
            precio = request.data.get('precio')
            cantidad = request.data.get('cantidad')
            costo = request.data.get('costo')
            contenido_imagen = request.FILES.get('imagen')
            tipo = TipoArticulo.objects.get(pk=request.data.get('tipo'))

            articulo = Articulo(nombre=nombre, descripcion=descripcion, precio=precio, costo=costo, cantidad=cantidad, tipo=tipo)
            if contenido_imagen:
                imagen = self.generar_nombre_unico(contenido_imagen.name)
                camino = default_storage.save(f"{settings.MEDIA_ROOT}/images/{imagen}", contenido_imagen)
                articulo.imagen = camino

            articulo.save()
            serializer = ArticuloSerializer(articulo)
            return crear_respuesta("Artículo creado exitosamente", serializer.data, status.HTTP_201_CREATED)
        except Exception as ex:
            return crear_respuesta("Error creando artículo", str(ex), status.HTTP_400_BAD_REQUEST)

    def generar_nombre_unico(self, nombre):
        return f"{uuid.uuid4().hex}{os.path.splitext(nombre)[1]}"


class UnArticulo(APIView):
    def _get_object(self, pk):
        try:
            return Articulo.objects.get(pk=pk)
        except Articulo.DoesNotExist:
            raise Http404

    def get(self, request: Request, pk, format=None):
        articulo = self._get_object(pk)
        serializer = ArticuloSerializer(articulo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return crear_respuesta("Artículo obtenido exitosamente", serializer.data)

        return crear_respuesta("Error obteniendo artículo", serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk, format=None):
        articulo = self._get_object(pk)
        articulo.delete()
        return crear_respuesta("Artículo borrado exitosamente", status_code=status.HTTP_204_NO_CONTENT)

    def put(self, request: Request, pk, format=None):
        articulo = self._get_object(pk)
        serializer = ArticuloSerializer(articulo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return crear_respuesta("Artículo modificado exitosamente", serializer.data, status.HTTP_202_ACCEPTED)

        return crear_respuesta("Error editando artículo", serializer.errors, status.HTTP_400_BAD_REQUEST)
