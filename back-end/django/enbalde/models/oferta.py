from django.db import models
from django.core.validators import MinValueValidator
from .common import aceptar_solo_fechas_futuras
from .articulo import Articulo


class Oferta(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=40, blank=False)
    descuento = models.DecimalField(max_length=4, blank=False, decimal_places=2, max_digits=4,
                                    validators=[MinValueValidator(0.01)])
    fecha_vencimiento = models.DateTimeField(blank=False, validators=[aceptar_solo_fechas_futuras])
    articulos = models.ManyToManyField(Articulo)

    class Meta:
        db_table = "Oferta"
        verbose_name = "Ofertas de articulos"
        verbose_name_plural = "Ofertas"

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre
