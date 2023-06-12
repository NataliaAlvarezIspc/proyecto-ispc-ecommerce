from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  
from django_rest_passwordreset.models import ResetPasswordToken


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token: ResetPasswordToken, *args, **kwargs):
    titulo = "Nueva clave para {title}".format(title="Enbalde")
    mensaje = f"Vuelva al sitio web y utilice esta token para cambiar la clave: {reset_password_token.key}"

    send_mail(titulo, mensaje, "noreply@enbalde.local", [reset_password_token.user.email])
