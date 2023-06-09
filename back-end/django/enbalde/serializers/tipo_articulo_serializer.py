from rest_framework import serializers
from ..models import TipoArticulo

class TipoArticuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoArticulo
        fields = ['id', 'nombre']
