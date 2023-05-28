from ..models import TipoArticulo
from ..serializers import TipoArticuloSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework import status
from .common import crear_respuesta


class MuchosTiposArticulos(APIView):
    def get(self, request: Request, format=None):
        tipo_articulos = TipoArticulo.objects.all()
        serializer = TipoArticuloSerializer(tipo_articulos, many=True)
        return crear_respuesta("Tipos de artículos retornados exitosamente", serializer.data)

    def post(self, request: Request, format=None):
        try:
            serializer = TipoArticuloSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return crear_respuesta("Tipo de artículo creado exitosamente", serializer.data, status.HTTP_201_CREATED)

            return crear_respuesta("Error creando tipo de artículo", serializer.errors, status.HTTP_400_BAD_REQUEST)

        except Exception as ex:
            return crear_respuesta("Error creando tipo de artículo", str(ex), status.HTTP_400_BAD_REQUEST)


class UnTipoArticulo(APIView):
    def _get_object(self, pk):
        try:
            return TipoArticulo.objects.get(pk=pk)
        except TipoArticulo.DoesNotExist:
            raise Http404

    def get(self, request: Request, pk, format=None):
        tipo_articulo = self._get_object(pk)
        tipo_articulo.nombre = request.data.get("nombre")
        serializer = TipoArticuloSerializer(tipo_articulo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return crear_respuesta("Tipo de artículo retornado exitosamente", serializer.data)

        return crear_respuesta("Error obteniendo tipo de artículo", serializer.errors, status.HTTP_400_BAD_REQUEST)

    def delete(self, request: Request, pk, format=None):
        tipo_articulo = self._get_object(pk)
        tipo_articulo.delete()
        return crear_respuesta("Tipo de artículo borrado exitosamente", status_code=status.HTTP_204_NO_CONTENT)

    def put(self, request: Request, pk, format=None):
        tipo_articulo = self._get_object(pk)
        serializer = TipoArticuloSerializer(tipo_articulo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return crear_respuesta("Tipo de artículo modificado exitosamente", serializer.data, status.HTTP_202_ACCEPTED)

        return crear_respuesta("Error editando tipo de artículo", serializer.errors, status.HTTP_400_BAD_REQUEST)
