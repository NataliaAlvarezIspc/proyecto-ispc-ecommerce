from rest_framework import serializers
from ..models import Usuario
from ..views.common import quitar_clave_de_respuesta

class UsuarioSerializer(serializers.ModelSerializer):
    usuario = serializers.CharField(required=True, source="username")
    clave = serializers.CharField(min_length=6, required=True, source="password")
    nombre = serializers.CharField(required=True, source="first_name")
    apellido = serializers.CharField(required=True, source="last_name")

    class Meta:
        model = Usuario
        fields = ['id', 'usuario', 'clave', 'tipo', 'nombre', 'apellido', 'email', 'direccion', 'telefono', 'observaciones']

    def to_representation(self, instance):
        return quitar_clave_de_respuesta(super().to_representation(instance))
