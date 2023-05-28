from rest_framework import serializers
from .models import Usuario, Articulo, TipoArticulo
from django.contrib.auth.hashers import make_password

def validate_password(self, value):
    return make_password(value)

class UsuarioSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True)
    password = serializers.CharField(
        min_length=8, required=True)
    class Meta:
        model = Usuario
        fields = ['username', 'password', 'tipo', 'first_name', 'last_name', 'email', 'direccion', 'telefono', 'observaciones']


class ArticuloSerializer(serializers.ModelSerializer):
    imagen = serializers.ImageField(max_length=None, allow_empty_file=False, use_url=True)

    class Meta:
        model = Articulo
        fields = ['nombre', 'descripcion', 'precio', 'costo', 'imagen', 'cantidad', 'tipo']


class TipoArticuloSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoArticulo
        fields = ['id', 'nombre']
