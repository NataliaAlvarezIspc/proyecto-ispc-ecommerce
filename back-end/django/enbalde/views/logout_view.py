from django.contrib.auth import logout
from rest_framework import status
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework.permissions import AllowAny
from ..views.common import crear_respuesta


class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request: Request):
        logout(request)
        token: OutstandingToken
        for token in OutstandingToken.objects.filter(user=request.user.id):
            _, _ = BlacklistedToken.objects.get_or_create(token=token)

        return crear_respuesta("Sesión terminada con éxito", status_code=status.HTTP_200_OK)
