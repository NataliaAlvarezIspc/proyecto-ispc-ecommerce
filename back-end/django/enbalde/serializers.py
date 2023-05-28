from rest_framework import serializers
from .models import Usuario, Articulo, TipoArticulo


class UsuarioSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, required=True)

    class Meta:
        model = Usuario
        fields = ['username', 'password', 'tipo', 'first_name', 'last_name', 'email', 'direccion', 'telefono', 'observaciones']


class TipoArticuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoArticulo
        fields = ['id', 'nombre']


class ArticuloSerializer(serializers.ModelSerializer):
    imagen = serializers.ImageField(max_length=None, allow_empty_file=False, use_url=True)
    tipo = TipoArticuloSerializer()

    class Meta:
        model = Articulo
        fields = ['id', 'nombre', 'descripcion', 'precio', 'costo', 'imagen', 'cantidad', 'tipo']
