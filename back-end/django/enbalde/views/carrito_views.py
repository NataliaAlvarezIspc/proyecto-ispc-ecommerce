from ..models import Carrito
from ..serializers import CarritoSerializer
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework import status
from rest_framework.permissions import AllowAny
from .common import crear_respuesta

class Carritos(APIView):
    def get(self, request: Request, pk, format=None):
        carrito = self._get_object(pk)
        serializer = CarritoSerializer(carrito)
        if serializer.is_valid():
            return crear_respuesta("Tipo de artículo retornado exitosamente", serializer.data)

        return crear_respuesta("Error obteniendo tipo de artículo", serializer.errors, status.HTTP_400_BAD_REQUEST)

#    def delete(self, request: Request, pk, format=None):
#        tipo_articulo = self._get_object(pk)
#        tipo_articulo.delete()
#        return crear_respuesta("Tipo de artículo borrado exitosamente", status_code=status.HTTP_204_NO_CONTENT)

    def put(self, request: Request, pk, format=None):
        carrito = self._get_object(pk)
        serializer = CarritoSerializer(carrito, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return crear_respuesta("Tipo de artículo modificado exitosamente", serializer.data, status.HTTP_202_ACCEPTED)

        return crear_respuesta("Error editando tipo de artículo", serializer.errors, status.HTTP_400_BAD_REQUEST)

