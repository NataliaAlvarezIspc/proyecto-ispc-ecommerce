from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from ..models import Oferta
from ..serializers import OfertaSerializer


class OfertaViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Oferta.objects.all()
    serializer_class = OfertaSerializer
