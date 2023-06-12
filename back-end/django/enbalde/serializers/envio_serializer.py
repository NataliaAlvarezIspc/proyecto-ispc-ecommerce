from rest_framework import serializers
from ..models import Envio


class EnvioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Envio
        fields = ['id', 'nombre', 'monto']
