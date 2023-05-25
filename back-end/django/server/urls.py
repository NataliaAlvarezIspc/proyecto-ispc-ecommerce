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
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers, serializers, viewsets
from enbalde.models import Usuario, Articulo, TipoArticulo

class UsuarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Usuario
        fields = ['url', 'username', 'tipo', 'first_name', 'last_name', 'email', 'direccion', 'telefono', 'observaciones']


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class ArticuloSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Articulo
        fields = ['url', 'nombre', 'descripcion', 'precio', 'costo', 'imagen', 'cantidad', 'tipo']


class ArticuloViewSet(viewsets.ModelViewSet):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer


class TipoArticuloSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TipoArticulo
        fields = ['id', 'nombre']


class TipoArticuloViewSet(viewsets.ModelViewSet):
    queryset = TipoArticulo.objects.all()
    serializer_class = TipoArticuloSerializer


router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'articulos', ArticuloViewSet)
router.register(r'tipo_articulos', TipoArticuloViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
