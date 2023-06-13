from django.urls import path, include
from rest_framework import routers
from .views import UnCarrito, Carritos, Compras, ContactoView, LoginView, LogoutView, SignupView, UsuarioViewSet, \
    ArticuloViewSet, TipoArticuloViewSet, OfertaViewSet, VentaViewSet, EnvioViewSet


router = routers.DefaultRouter()
router.register('usuarios', UsuarioViewSet)
router.register('tipo_articulos', TipoArticuloViewSet)
router.register('articulos', ArticuloViewSet)
router.register('ventas', VentaViewSet)
router.register('ofertas', OfertaViewSet)
router.register('envios', EnvioViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', LoginView.as_view(), name='auth_login'),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),
    path('auth/signup/', SignupView.as_view(), name='auth_signup'),
    path('auth/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('carritos/<int:pk>', UnCarrito.as_view()),
    path('carritos/', Carritos.as_view()),
    path('compras/<int:pk>', Compras.as_view()),
    path('contacto/', ContactoView.as_view(), name='contacto')
]
