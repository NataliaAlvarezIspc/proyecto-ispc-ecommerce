from django.utils import timezone
from django.urls import path, include
from rest_framework import routers, viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from .models import TipoArticulo, Carrito, Seleccion, Venta, Envio, Oferta
from .serializers import TipoArticuloSerializer, CarritoSerializer, \
    SeleccionSerializer, VentaSerializer, OfertaSerializer, EnvioSerializer
from .views.logout_views import LogoutView
from .views.carrito_views import UnCarrito, Carritos
from .views.compra_views import Compras
from .views.contacto_views import ContactoView
from .views.registracion_views import SignupView
from .views.login_views import LoginView
from .views.usuario_views import UsuarioViewSet
from .views.articulo_views import ArticuloViewSet


# TODO: validar que no se creen dos iguales?
class TipoArticuloViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = TipoArticulo.objects.all()
    serializer_class = TipoArticuloSerializer


class CarritoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Carrito.objects.all()
    serializer_class = CarritoSerializer


class SeleccionViewSet(viewsets.ModelViewSet):
    queryset = Seleccion.objects.all()
    serializer_class = SeleccionSerializer


class OfertaViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Oferta.objects.all()
    serializer_class = OfertaSerializer


class VentaViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Venta.objects.all()
    serializer_class = VentaSerializer

    def create(self, request: Request, *args, **kwargs):
        try:
            carrito = Carrito.objects.get(pk=int(request.data.get("carrito")))
            envio = Envio.objects.get(pk=int(request.data.get("envio")))
            fecha = timezone.now()
            numero = 1
            comprobante = 1

            ultima_venta = Venta.objects.last()
            if ultima_venta is not None:
                nuevo_comprobante = ultima_venta.comprobante + 1
                comprobante = nuevo_comprobante % 1000
                numero = ultima_venta.numero + (nuevo_comprobante / 1000)

            total = self._calcular_total_de_carrito(carrito) + envio.monto
            pago = request.data.get('pago')
            transaccion = request.data.get('transaccion')
            venta = Venta(numero=numero, comprobante=comprobante, fecha=fecha, total=total, carrito=carrito, envio=envio,
                          pago=pago, transaccion=transaccion)
            venta.save()
            carrito.comprado = True
            carrito.save()
            serializer = VentaSerializer(venta)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def _calcular_total_de_carrito(self, carrito: Carrito):
        total = 0
        selecciones = Seleccion.objects.filter(carrito=carrito)
        for seleccion in selecciones:
            total += seleccion.articulo.precio * seleccion.cantidad

        return total


class EnvioViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Envio.objects.all()
    serializer_class = EnvioSerializer


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
