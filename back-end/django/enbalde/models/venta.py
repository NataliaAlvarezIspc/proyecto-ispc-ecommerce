from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal
from .envio import Envio
from .carrito import Carrito
from .common import aceptar_solo_fechas_pasadas


class Venta(models.Model):
    class TipoPago(models.IntegerChoices):
        EFECTIVO_A_PAGAR = 1
        EFECTIVO_PAGADO = 2
        ENBALDE_PAGO = 3

    id = models.AutoField(primary_key=True)
    numero = models.PositiveIntegerField(blank=False)
    comprobante = models.PositiveIntegerField(blank=False)
    fecha = models.DateTimeField(blank=False, validators=[aceptar_solo_fechas_pasadas])
    total = models.DecimalField(max_length=10, blank=False, decimal_places=2, max_digits=10,
                                validators=[MinValueValidator(Decimal('0.01'))])
    envio = models.ForeignKey(Envio, to_field="id", on_delete=models.CASCADE)
    carrito = models.ForeignKey(Carrito, to_field="id", on_delete=models.CASCADE)
    pago = models.IntegerField(choices=TipoPago.choices, default=TipoPago.EFECTIVO_A_PAGAR, blank=False)
    transaccion = models.CharField(max_length=80, blank=True)

    class Meta:
        db_table = "Venta"
        verbose_name = "Listado de Ventas"
        verbose_name_plural = "Ventas"

    def __unicode__(self):
        return u'Venta a {0} por {1} con {2}'.format(self.carrito.cliente.first_name, self.total, self.envio.nombre.lower())

    def __str__(self):
        return 'Venta a {0} por {1} con {2}'.format(self.carrito.cliente.first_name, self.total, self.envio.nombre.lower())
