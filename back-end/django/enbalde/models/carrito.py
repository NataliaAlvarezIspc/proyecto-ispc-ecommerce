from django.db import models
from django.conf import settings
from .common import aceptar_solo_fechas_futuras

class Carrito(models.Model):
    id = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(settings.AUTH_USER_MODEL, to_field="id", on_delete=models.CASCADE)
    fecha = models.DateTimeField(blank=False, validators=[aceptar_solo_fechas_futuras])
    comprado = models.BooleanField(blank=False, default=False)

    class Meta:
        db_table = "Carrito"
        verbose_name = "Carrito de compra"
        verbose_name_plural = "Carritos"

    def __unicode__(self):
        return u'Carrito de {0}'.format(self.cliente.first_name)

    def __str__(self):
        return 'Carrito de {0}'.format(self.cliente.first_name)
