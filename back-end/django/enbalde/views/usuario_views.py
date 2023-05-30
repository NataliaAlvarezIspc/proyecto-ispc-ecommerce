from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializers import UsuarioSerializer
from ..models import Usuario
from .common import crear_respuesta


class SignupView(generics.CreateAPIView):
    def post(self, request: Request):
        try:
            username = request.data.get("usuario")
            password = request.data.get("clave")
            first_name = request.data.get("nombre")
            last_name = request.data.get("apellido")
            email = request.data.get("email")
            tipo = request.data.get("tipo")
            direccion = request.data.get("direccion")
            telefono = request.data.get("telefono")
            observaciones = ""
            existe = Usuario.objects.filter(username=username)
            if existe:
                return crear_respuesta("El nombre de usuario seleccionado ya existe", status_code=status.HTTP_400_BAD_REQUEST)

            usuario = Usuario(username=username, password=password, tipo=tipo, first_name=first_name, last_name=last_name,
                              email=email, direccion=direccion, telefono=telefono, observaciones=observaciones)
            usuario.set_password(password)
            usuario.validate_unique()
            usuario.save()
            serializer = UsuarioSerializer(usuario)
            return crear_respuesta("Usuario creado exitosamente", serializer.data, status.HTTP_201_CREATED)

        except Exception as ex:
            return crear_respuesta("Error creando usuario", str(ex), status.HTTP_400_BAD_REQUEST)


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
    def post(self, request):
        logout(request)

        return Response(status=status.HTTP_200_OK)
