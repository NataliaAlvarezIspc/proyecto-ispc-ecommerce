from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class Usuario(AbstractUser):
    class TipoUsuario(models.IntegerChoices):
        ADMINISTRADOR = 1
        CLIENTE = 2

    first_name = models.CharField(_("Nombre"), max_length=150, blank=False)
    last_name = models.CharField(_("Apellido"), max_length=150, blank=False)
    email = models.EmailField(_('Correo electrónico'), blank=False)
    tipo = models.IntegerField(choices=TipoUsuario.choices, default=TipoUsuario.ADMINISTRADOR, blank=False)
    direccion = models.CharField(max_length=100, blank=False)
    telefono = models.CharField(max_length=20, blank=True)
    observaciones = models.CharField(max_length=200, blank=True)

    class Meta:
        db_table = "auth_user"
        verbose_name = "Listado de usuarios"
        verbose_name_plural = "Usuarios"

    def __unicode__(self):
        return self.first_name

    def __str__(self):
        return self.first_name
