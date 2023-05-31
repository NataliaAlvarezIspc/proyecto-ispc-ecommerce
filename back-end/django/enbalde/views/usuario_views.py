from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, status
from rest_framework.serializers import ValidationError
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from ..serializers import UsuarioSerializer, RegistroSerializer
from ..models import Usuario
from ..views.common import crear_respuesta


class SignupView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = RegistroSerializer

    def create(self, request: Request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                self.perform_create(serializer)
                return crear_respuesta("Usuario registrado exitosamente", serializer.data, status.HTTP_201_CREATED)
            except ValidationError as ex:
                return crear_respuesta(str(ex.detail[0]), status_code=status.HTTP_400_BAD_REQUEST)

        return crear_respuesta("Error registrando usuario", serializer.errors, status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request: Request):
        username = request.data.get('usuario')
        password = request.data.get('clave')
        user = authenticate(username=username, password=password)

        if user:
            token = RefreshToken.for_user(user)
            login(request, user)

            serializer = UsuarioSerializer(user)
            respuesta = crear_respuesta("Inicio de sesión exitoso", { 'usuarioActual': serializer.data, 'accessToken': { 'acceso': str(token.access_token), 'refresco': str(token) } }, status.HTTP_200_OK)
            respuesta.set_cookie('accessToken', token, httponly=True)
            return respuesta

        return crear_respuesta("Error iniciando sesión", status_code=status.HTTP_404_NOT_FOUND)


class LogoutView(APIView):
    def post(self, request: Request):
        logout(request)
        token: OutstandingToken
        for token in OutstandingToken.objects.filter(user=request.user.id):
            _, _ = BlacklistedToken.objects.get_or_create(token=token)

        return crear_respuesta("Sesión terminada con éxito", status_code=status.HTTP_200_OK)
