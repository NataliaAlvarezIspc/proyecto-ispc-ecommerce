"""
URL configuration for server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers, viewsets
from enbalde.views import articulo_views, tipo_articulo_views
from enbalde.models import Usuario, Articulo, TipoArticulo
from enbalde.serializers import UsuarioSerializer, ArticuloSerializer, TipoArticuloSerializer



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
router.register(r'usuarios', UsuarioViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('enbalde.urls')),
    path('api/', include(router.urls)),
    path('api/articulos/', articulo_views.MuchosArticulos.as_view()),
    path('api/articulos/<int:pk>', articulo_views.UnArticulo.as_view()),
    path('api/tipo_articulos/', tipo_articulo_views.MuchosTiposArticulos.as_view()),
    path('api/tipo_articulos/<int:pk>', tipo_articulo_views.UnTipoArticulo.as_view()),
    path('', include(router.urls))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

