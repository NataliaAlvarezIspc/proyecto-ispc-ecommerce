from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from ..models import Usuario, Venta
from ..serializers import VentaSerializer

class Compras(APIView):
    permission_classes = [IsAuthenticated]
    def _obtener_usuario(self, pk) -> Usuario:
        try:
            return Usuario.objects.get(pk=pk)
        except Usuario.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        cliente = self._obtener_usuario(pk)
        ventas = Venta.objects.filter(carrito__cliente = cliente)
        serializer = VentaSerializer(instance=ventas, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
