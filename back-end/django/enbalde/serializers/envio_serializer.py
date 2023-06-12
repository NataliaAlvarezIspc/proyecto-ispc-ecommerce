from rest_framework import serializers
from ..models import Envio


class EnvioSerializer(serializers.ModelSerializer):
    monto = serializers.IntegerField()

    class Meta:
        model = Envio
        fields = ['id', 'nombre', 'monto']
