from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal


class Envio(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=40, blank=False)
    monto = models.DecimalField(max_length=10, blank=False, decimal_places=2, max_digits=10,
                                validators=[MinValueValidator(Decimal('0'))])

    class Meta:
        db_table = "Envio"
        verbose_name = "Tipos de envios disponibles"
        verbose_name_plural = "Envios"

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre
