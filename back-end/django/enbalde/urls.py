from django.urls import path, include
from rest_framework import routers, viewsets
from .models import Usuario, Articulo, TipoArticulo
from .serializers import UsuarioSerializer, ArticuloSerializer, TipoArticuloSerializer
from .views.usuario_views import LoginView, LogoutView, SignupView
from .views.tipo_articulo_views import UnTipoArticulo
from .models import Usuario


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class ArticuloViewSet(viewsets.ModelViewSet):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer
    

# TODO: validar que no se creen dos iguales?
class TipoArticuloViewSet(viewsets.ModelViewSet):
    queryset = TipoArticulo.objects.all()
    serializer_class = TipoArticuloSerializer


router = routers.DefaultRouter()
router.register('usuarios', UsuarioViewSet)
router.register('tipo_articulos', TipoArticuloViewSet)
router.register('articulos', ArticuloViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', LoginView.as_view(), name='auth_login'),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),
    path('auth/signup/', SignupView.as_view(), name='auth_signup'),
]
