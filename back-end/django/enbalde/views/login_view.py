from django.contrib.auth import authenticate, login
from django.utils import timezone
from rest_framework import status
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from ..serializers import UsuarioSerializer
from ..models import Usuario, Carrito
from ..views.common import crear_respuesta


class LoginView(APIView):
    permission_classes = [AllowAny]

    def _get_carrito(self, cliente):
        try:
            return Carrito.objects.get(cliente=cliente, comprado=False)
        except Carrito.DoesNotExist:
            fecha = timezone.now()
            carrito = Carrito.objects.create(cliente=cliente, fecha=fecha, comprado=False)
            carrito.save()
            return carrito

    def post(self, request: Request):
        username = request.data.get('usuario')
        password = request.data.get('clave')
        user = authenticate(username=username, password=password)

        if user:
            token = RefreshToken.for_user(user)
            access_token = token.access_token
            access_token.set_exp(lifetime=timezone.timedelta(days=1))
            login(request, user)

            usuario = Usuario.objects.get(pk=user.id)
            serializer = UsuarioSerializer(usuario)
            if not user.is_staff:
                carrito = self._get_carrito(user)
                respuesta = crear_respuesta("Inicio de sesión exitoso",
                                            {'carritoActual': carrito.id, 'usuarioActual': serializer.data,
                                             'accessToken': {'acceso': str(access_token), 'refresco': str(token)}},
                                            status.HTTP_200_OK)
            else:
                respuesta = crear_respuesta("Inicio de sesión exitoso",
                                            {'usuarioActual': serializer.data,
                                             'accessToken': {'acceso': str(access_token), 'refresco': str(token)}},
                                            status.HTTP_200_OK)

            respuesta.set_cookie('accessToken', token, httponly=True)
            return respuesta

        return crear_respuesta("Error iniciando sesión", status_code=status.HTTP_404_NOT_FOUND)
