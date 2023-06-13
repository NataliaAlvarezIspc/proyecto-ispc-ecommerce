from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail


class ContactoView(APIView):
    def post(self, request):
        name = request.POST.get('name')
        email = request.POST.get('email')
        reason = request.POST.get('reason')
        message = request.POST.get('message')

        asunto = f"Nuevo mensaje de contacto - {reason}"
        contenido = f"Nombre: {name}\nCorreo: {email}\nMensaje: {message}"
        remitente = 'admin@enbalde.local'
        destinatario = ['admin@enbalde.local']

        send_mail(asunto, contenido, remitente, destinatario)
        return Response(status=status.HTTP_200_OK)
