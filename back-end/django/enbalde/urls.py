from django.urls import path
from .views.usuario_views import LoginView, LogoutView, SignupView
from .views.articulo_views import MuchosArticulos, UnArticulo
from .views.tipo_articulo_views import MuchosTiposArticulos, UnTipoArticulo

urlpatterns = [
    path('auth/login/', LoginView.as_view(), name='auth_login'),
    path('auth/logout/', LogoutView.as_view(), name='auth_logout'),
    path('auth/signup/', SignupView.as_view(), name='auth_signup'),
    path('articulos/', MuchosArticulos.as_view()),
    path('articulos/<int:pk>', UnArticulo.as_view()),
    path('tipo_articulos/', MuchosTiposArticulos.as_view()),
    path('tipo_articulos/<int:pk>', UnTipoArticulo.as_view())
]
