from django.urls import path, include
from django.conf import settings
from django.core.files.storage import default_storage
from rest_framework import routers, viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework import status
from .models import Usuario, Articulo, TipoArticulo, Carrito, Seleccion
from .serializers import UsuarioSerializer, ArticuloSerializer, TipoArticuloSerializer, CarritoSerializer, SeleccionSerializer
from .views.usuario_views import LoginView, LogoutView, SignupView
from .views.carrito_views import Carritos
from .views.common import generar_nombre_unico


class UsuarioViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


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

        except Exception as ex:
            return Response(status=status.HTTP_400_BAD_REQUEST)


# TODO: validar que no se creen dos iguales?
class TipoArticuloViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]

    queryset = TipoArticulo.objects.all()
    serializer_class = TipoArticuloSerializer


class CarritoViewSet(viewsets.ModelViewSet):
    queryset = Carrito.objects.all()
    serializer_class = CarritoSerializer

    def update(self, request: Request, *args, **kwargs):
        try:
            articulo_id = request.data.get("articulo")
            print("id articulo:", articulo_id)
            cantidad = request.data.get('cantidad')
            print("cantidad:", cantidad)

            carrito_existente = self.get_object()
            print("carrito existente:", carrito_existente)
            articulo = Articulo.objects.get(pk=articulo_id)
            print("articulo:", articulo)
            seleccion = Seleccion.objects.get(carrito=carrito_existente, articulo=articulo)
            if seleccion is None:
                seleccion = Seleccion.objects.create(carrito=carrito_existente, cantidad=1, articulo=articulo)

            print("seleccion:", seleccion)
            seleccion.cantidad += 1
            seleccion.save()

            serializer = ArticuloSerializer(carrito_existente)
            return Response(serializer.data, status.HTTP_201_CREATED)

        except Exception as ex:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class SeleccionViewSet(viewsets.ModelViewSet):
    queryset = Seleccion.objects.all()
    serializer_class = SeleccionSerializer


router = routers.DefaultRouter()
router.register('usuarios', UsuarioViewSet)
router.register('tipo_articulos', TipoArticuloViewSet)
router.register('articulos', ArticuloViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', LoginView.as_view(), name='auth_login'),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),
    path('auth/signup/', SignupView.as_view(), name='auth_signup'),
    path('carritos/', Carritos.as_view())
]
