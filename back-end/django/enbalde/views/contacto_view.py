from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from server.settings import EMAIL_HOST_USER


class ContactoView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            name = request.POST.get('name')
            email = request.POST.get('email')
            reason = request.POST.get('reason')
            message = request.POST.get('message')

            asunto = f"Nuevo mensaje de Enbalde Contacto - {reason}"
            contenido = f"Nombre: {name}\nCorreo: {email}\nMensaje: {message}"
            remitente = EMAIL_HOST_USER
            destinatario = [EMAIL_HOST_USER]

            send_mail(asunto, contenido, remitente, destinatario)
            return Response(status=status.HTTP_200_OK)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
