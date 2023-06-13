from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from ..models import TipoArticulo
from ..serializers import TipoArticuloSerializer


class TipoArticuloViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = TipoArticulo.objects.all()
    serializer_class = TipoArticuloSerializer
