from rest_framework import serializers
from .models import Usuario, Articulo, TipoArticulo


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['username', 'tipo', 'first_name', 'last_name', 'email', 'direccion', 'telefono', 'observaciones']


class ArticuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articulo
        fields = ['nombre', 'descripcion', 'precio', 'costo', 'imagen', 'cantidad', 'tipo']


class TipoArticuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoArticulo
        fields = ['nombre']
