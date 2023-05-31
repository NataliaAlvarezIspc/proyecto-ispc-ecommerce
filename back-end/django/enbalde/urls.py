from django.urls import path, include
from rest_framework import routers, viewsets
from .models import Usuario, Articulo, TipoArticulo
from .serializers import UsuarioSerializer, ArticuloSerializer, TipoArticuloSerializer
from .views.usuario_views import LoginView, LogoutView, SignupView
from .views.articulo_views import MuchosArticulos, UnArticulo
from .views.tipo_articulo_views import MuchosTiposArticulos, UnTipoArticulo
from .models import Usuario


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class ArticuloViewSet(viewsets.ModelViewSet):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer


class TipoArticuloViewSet(viewsets.ModelViewSet):
    queryset = TipoArticulo.objects.all()
    serializer_class = TipoArticuloSerializer


router = routers.DefaultRouter()
router.register('usuarios', UsuarioViewSet)
router.register('tipo_articulos', TipoArticuloViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', LoginView.as_view(), name='auth_login'),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),
    path('auth/signup/', SignupView.as_view(), name='auth_signup'),
    path('articulos/', MuchosArticulos.as_view()),
    path('articulos/<int:pk>', UnArticulo.as_view()),
    path('tipo_articulos/<int:pk>', UnTipoArticulo.as_view())
]
