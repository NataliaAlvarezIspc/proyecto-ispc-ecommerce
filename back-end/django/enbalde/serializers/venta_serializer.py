from rest_framework import serializers
from ..models import Carrito, Seleccion, Venta, Envio
from .carrito_serializer import CarritoSerializer
from .seleccion_serializer import SeleccionSerializer


class VentaSerializer(serializers.ModelSerializer):
    carrito = CarritoSerializer()

    class Meta:
        model = Venta
        fields = ['numero', 'comprobante', 'fecha', 'total', 'envio', 'carrito', 'pago', 'transaccion']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        carrito = representation.pop("carrito")
        cliente = carrito.get("cliente")
        representation.update({"cliente": f"{cliente.get('nombre')} {cliente.get('apellido')}"})

        objeto_carrito = Carrito.objects.get(pk=carrito.get("id"))
        envio = Envio.objects.get(pk=representation['envio'])
        selecciones = Seleccion.objects.filter(carrito=objeto_carrito)

        serializer = SeleccionSerializer(selecciones, many=True)
        representation.update({"selecciones": serializer.data})
        representation.update({"envio": envio.nombre})
        return representation
