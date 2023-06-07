from django.http import Http404
from ..models import Carrito, Seleccion, Articulo
from ..serializers import CarritoSerializer, SeleccionSerializer
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .common import crear_respuesta

class Carritos(APIView):
    permission_classes=[IsAuthenticated]
    def _obtener_objecto(self, pk) -> Carrito:
        try:
            return Carrito.objects.get(pk=pk)
        except Carrito.DoesNotExist:
            raise Http404

    def _obtener_articulo(self, pk) -> Articulo:
        try:
            return Articulo.objects.get(pk=pk)
        except Articulo.DoesNotExist:
            raise Http404

    def _obtener_seleccion(self, carrito, articulo) -> Seleccion:
        seleccion = Seleccion.objects.filter(carrito=carrito, articulo=articulo).first()
        if seleccion is None:
            seleccion = Seleccion.objects.create(carrito=carrito, articulo=articulo, cantidad=0)

        return seleccion

    def get(self, request: Request, pk, format=None):
        carrito = self._obtener_objecto(pk)
        serializer = CarritoSerializer(instance=carrito)
        if serializer.is_valid():
            return crear_respuesta("Tipo de artículo retornado exitosamente", serializer.data)

        return crear_respuesta("Error obteniendo tipo de artículo", serializer.errors, status.HTTP_400_BAD_REQUEST)

#    def delete(self, request: Request, pk, format=None):
#        tipo_articulo = self._get_object(pk)
#        tipo_articulo.delete()
#        return crear_respuesta("Tipo de artículo borrado exitosamente", status_code=status.HTTP_204_NO_CONTENT)

    def put(self, request: Request, pk, format=None):
        carrito = self._obtener_objecto(pk)
        articulo_id = request.data.get("articulo")
        cantidad = int(request.data.get("cantidad"))
        if cantidad < 1:
            return Response(False, status=status.HTTP_400_BAD_REQUEST)

        articulo = self._obtener_articulo(articulo_id)
        if articulo.cantidad < cantidad:
            return Response(False, status=status.HTTP_400_BAD_REQUEST)

        seleccion = self._obtener_seleccion(carrito, articulo)
        seleccion.cantidad += cantidad
        seleccion.save()

        articulo.cantidad -= cantidad
        articulo.save()

        return Response(True, status=status.HTTP_202_ACCEPTED)
