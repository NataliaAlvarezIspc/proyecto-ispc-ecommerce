from rest_framework import serializers
from ..models import Articulo


class ArticuloSerializer(serializers.ModelSerializer):
    imagen = serializers.ImageField(max_length=None, allow_empty_file=False, use_url=True)

    class Meta:
        model = Articulo
        fields = ['id', 'nombre', 'descripcion', 'precio', 'costo', 'imagen', 'cantidad', 'tipo']


class ArticuloIdSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Articulo
        fields = ['id']
