from collections import OrderedDict
from rest_framework import serializers
from ..models import Oferta, Articulo
from .articulo_serializer import ArticuloIdSerializer, ArticuloSerializer


class OfertaSerializer(serializers.ModelSerializer):
    fechaVencimiento = serializers.DateTimeField(required=True, source="fecha_vencimiento")
    articulos = ArticuloIdSerializer(read_only=False, many=True)

    class Meta:
        model = Oferta
        fields = ['id', 'nombre', 'descuento', 'fechaVencimiento', 'articulos']

    def create(self, validated_data: OrderedDict):
        articulos = [Articulo.objects.get(pk=articulo["id"]) for articulo in validated_data["articulos"]]
        oferta = Oferta.objects.create(nombre=validated_data["nombre"], descuento=validated_data["descuento"],
                                       fecha_vencimiento=validated_data["fecha_vencimiento"])
        oferta.articulos.set(articulos)
        oferta.save()
        return oferta
