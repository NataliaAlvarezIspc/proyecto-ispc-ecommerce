from rest_framework import serializers
from ..models import Seleccion, Oferta
from .articulo_serializer import ArticuloSerializer
from .oferta_serializer import OfertaSerializer


class SeleccionSerializer(serializers.ModelSerializer):
    articulo = ArticuloSerializer()

    class Meta:
        model = Seleccion
        fields = ['id', 'cantidad', 'articulo']

    def to_representation(self, instance: Seleccion):
        representation = super().to_representation(instance)

        ofertas = Oferta.objects.filter(articulos=instance.articulo)
        ls = []
        for oferta in ofertas:
            serializer = OfertaSerializer(instance=oferta)
            ls.append({ "nombre": serializer.data["nombre"], "descuento": serializer.data["descuento"] })

        representation.update({ "ofertas": ls })
        return representation
