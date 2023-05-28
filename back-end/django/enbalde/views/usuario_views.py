from django.contrib.auth import authenticate, login, logout
from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import UsuarioSerializer
class SignupView(generics.CreateAPIView):
    serializer_class = UsuarioSerializer

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username', None)
        password = request.data.get('password', None)
        user = authenticate(username=username, password=password)

        if user:
            login(request, user)
            return Response(
                UsuarioSerializer(user).data,
                status=status.HTTP_200_OK)

        return Response(status=status.HTTP_404_NOT_FOUND)

class LogoutView(APIView):
    def post(self, request):
        logout(request)

        return Response(status=status.HTTP_200_OK)
    