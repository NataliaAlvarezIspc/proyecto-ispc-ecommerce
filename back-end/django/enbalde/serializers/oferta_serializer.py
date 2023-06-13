from collections import OrderedDict
from rest_framework import serializers
from ..models import Oferta, Articulo
from .articulo_serializer import ArticuloIdSerializer


class OfertaSerializer(serializers.ModelSerializer):
    fechaVencimiento = serializers.DateTimeField(required=True, source="fecha_vencimiento")
    articulos = ArticuloIdSerializer(read_only=False, many=True)

    class Meta:
        model = Oferta
        fields = ['id', 'nombre', 'descuento', 'fechaVencimiento', 'articulos']

    def create(self, validated_data: OrderedDict):
        articulos = self._obtener_articulos_de_datos(validated_data)
        oferta = Oferta.objects.create(nombre=validated_data["nombre"], descuento=validated_data["descuento"],
                                       fecha_vencimiento=validated_data["fecha_vencimiento"])
        oferta.articulos.set(articulos)
        oferta.save()
        return oferta

    def _obtener_articulos_de_datos(self, validated_data):
        return [Articulo.objects.get(pk=articulo["id"]) for articulo in validated_data["articulos"]]

    def update(self, instance: Oferta, validated_data):
        articulos = self._obtener_articulos_de_datos(validated_data)
        instance.nombre = validated_data["nombre"]
        instance.descuento = validated_data["descuento"]
        instance.fecha_vencimiento = validated_data["fecha_vencimiento"]
        instance.articulos.set(articulos)
        instance.save()
        return instance
