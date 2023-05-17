from django.db import models


# Create your models here.
class Envio(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=40, blank=False)
    monto = models.DecimalField(max_length=10, blank=False, decimal_places=2, max_digits=10)

    class Meta:
        db_table = "Envio"
        verbose_name = "Tipos de envios disponibles"
        verbose_name_plural = "Envios"

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre


class TipoArticulo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=40, blank=False)


class Producto(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=200, blank=False)
    descripcion = models.CharField(max_length=200, blank=False)
    precio = models.DecimalField(max_length=10, blank=False, decimal_places=2, max_digits=10)
    costo =  models.DecimalField(max_length=10, blank=False, decimal_places=2, max_digits=10)
    alicuota = models.DecimalField(max_length=10, blank=False, decimal_places=2, max_digits=10)
    imagen = models.CharField(max_length=512, blank=False)
    cantidad = models.IntegerField(blank=False, default=0)
    id_tipo = models.ForeignKey(TipoArticulo, to_field="id", on_delete=models.CASCADE)

    class Meta:
        db_table = "Producto"
        verbose_name = "Productos del negocio"
        verbose_name_plural = "Productos"

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre
