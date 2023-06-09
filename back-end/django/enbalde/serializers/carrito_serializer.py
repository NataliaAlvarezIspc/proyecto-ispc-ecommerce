from rest_framework import serializers
from ..models import Carrito
from .usuario_serializer import UsuarioSerializer

class CarritoSerializer(serializers.ModelSerializer):
    cliente = UsuarioSerializer()

    class Meta:
        model = Carrito
        fields = ['id', 'cliente', 'fecha']
