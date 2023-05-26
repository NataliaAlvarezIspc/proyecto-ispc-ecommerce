from .models import Articulo, TipoArticulo
from .serializers import ArticuloSerializer, TipoArticuloSerializer
from django.http import Http404, JsonResponse
from django.conf import settings
from django.core import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
import os
import uuid


def crear_respuesta(mensaje: str, data: any, status_code: status = status.HTTP_200_OK):
    return JsonResponse({ "mensaje": mensaje, "data": data, "status": status_code }, status=status_code, safe=False)


# Create your views here.
class MuchosArticulos(APIView):
    def get(self, request: Request, format=None):
        articulos = Articulo.objects.all()
        serializer = ArticuloSerializer(articulos, many=True)
        return crear_respuesta("Artículos retornados exitosamente", serializer.data)

    def post(self, request: Request, format=None):
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
            self.grabar_imagen(contenido_imagen, imagen)

            articulo.imagen = imagen

        serializer = ArticuloSerializer(articulo)
        dato = serializer.data
        serializer = ArticuloSerializer(data=dato)
        if serializer.is_valid():
            serializer.save()
            return crear_respuesta("Artículo creado exitosamente", serializer.data, status.HTTP_201_CREATED)

        respuesta = crear_respuesta("Error creando artículo", serializer.errors, status.HTTP_400_BAD_REQUEST)
        return respuesta

    def generar_nombre_unico(self, nombre):
        return f"{uuid.uuid4().hex}{os.path.splitext(nombre)[1]}"

    def grabar_imagen(self, imagen, nombre_imagen):
        directorio = os.path.join(settings.MEDIA_ROOT, 'images')
        os.makedirs(directorio, exist_ok=True)
        nombre_completo_imagen = os.path.join(directorio, nombre_imagen)
        with open(nombre_completo_imagen, "wb") as archivo:
            for chunk in imagen.chunks():
                archivo.write(chunk)


class UnArticulo(APIView):
    def get_object(self, pk):
        try:
            return Articulo.objects.get(pk=pk)
        except Articulo.DoesNotExist:
            raise Http404

    def get(self, request: Request, pk, format=None):
        articulo = self.get_object(pk)
        serializer = ArticuloSerializer(articulo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk, format=None):
        articulo = self.get_object(pk)
        articulo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MuchosTiposDeArticulos(APIView):
    def get(self, request: Request, format=None):
        articulos = TipoArticulo.objects.all()
        serializer = TipoArticuloSerializer(articulos, many=True)
        return crear_respuesta("Tipos de artículos retornados exitosamente", serializer.data)

    def post(self, request: Request, format=None):
        serializer = TipoArticuloSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return crear_respuesta("Tipo de artículo creado exitosamente", serializer.data, status.HTTP_201_CREATED)

        respuesta = crear_respuesta("Error creando tipo de artículo", serializer.errors, status.HTTP_400_BAD_REQUEST)
        return respuesta
