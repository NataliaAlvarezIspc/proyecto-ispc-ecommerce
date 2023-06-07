from django.http import Http404
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from ..models import Carrito, Seleccion, Articulo
from ..serializers import SeleccionSerializer

class UnCarrito(APIView):
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
        selecciones = Seleccion.objects.filter(carrito=carrito)
        serializer = SeleccionSerializer(instance=selecciones, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request: Request, pk, format=None):
        carrito = self._obtener_objecto(pk)
        articulo_id = request.data.get("articulo")
        cantidad = int(request.data.get("cantidad"))

        articulo = self._obtener_articulo(articulo_id)
        if cantidad > 0 and articulo.cantidad < cantidad:
            return Response(False, status=status.HTTP_400_BAD_REQUEST)

        seleccion = self._obtener_seleccion(carrito, articulo)
        if cantidad < 0 and seleccion.cantidad < -cantidad:
            return Response(False, status=status.HTTP_400_BAD_REQUEST)

        seleccion.cantidad += cantidad
        seleccion.save()

        articulo.cantidad -= cantidad
        articulo.save()

        return Response(True, status=status.HTTP_200_OK)
