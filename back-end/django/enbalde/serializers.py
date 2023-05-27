from rest_framework import serializers
from .models import Usuario, Articulo, TipoArticulo


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['username', 'tipo', 'first_name', 'last_name', 'email', 'direccion', 'telefono', 'observaciones']


class ArticuloSerializer(serializers.ModelSerializer):
    imagen = serializers.ImageField(max_length=None, allow_empty_file=False, use_url=True)

    class Meta:
        model = Articulo
        fields = ['id', 'nombre', 'descripcion', 'precio', 'costo', 'imagen', 'cantidad', 'tipo']


class TipoArticuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoArticulo
        fields = ['id', 'nombre']
