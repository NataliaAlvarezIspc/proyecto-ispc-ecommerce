from django.conf import settings
from django.core.files.storage import default_storage
from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from ..models import Articulo, TipoArticulo
from ..serializers import ArticuloSerializer
from ..views.common import generar_nombre_unico


class ArticuloViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]

    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer

    def update(self, request: Request, *args, **kwargs):
        try:
            articulo_existente = self.get_object()
            articulo_existente.nombre = request.data.get('nombre')
            articulo_existente.descripcion = request.data.get('descripcion')
            articulo_existente.precio = request.data.get('precio')
            articulo_existente.cantidad = request.data.get('cantidad')
            articulo_existente.costo = request.data.get('costo')
            articulo_existente.tipo = TipoArticulo.objects.get(pk=request.data.get('tipo'))

            contenido_imagen = request.FILES.get('imagen')
            if contenido_imagen:
                imagen = generar_nombre_unico(contenido_imagen.name)
                camino = default_storage.save(f"{settings.MEDIA_ROOT}/images/{imagen}", contenido_imagen)
                articulo_existente.imagen = camino

            articulo_existente.save()
            serializer = ArticuloSerializer(articulo_existente)
            return Response(serializer.data, status.HTTP_201_CREATED)

        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
