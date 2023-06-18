from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ..models import Envio
from ..serializers import EnvioSerializer


class EnvioViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Envio.objects.all()
    serializer_class = EnvioSerializer
