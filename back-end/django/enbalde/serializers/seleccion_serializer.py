from rest_framework import serializers
from ..models import Seleccion
from .articulo_serializer import ArticuloSerializer

class SeleccionSerializer(serializers.ModelSerializer):
    articulo = ArticuloSerializer()

    class Meta:
        model = Seleccion
        fields = ['id', 'cantidad', 'articulo']
