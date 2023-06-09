from django.db import models
from django.core.validators import MinValueValidator
from .tipo_articulo import TipoArticulo

class Articulo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=200, blank=False)
    descripcion = models.CharField(max_length=200, blank=False)
    precio = models.DecimalField(max_length=10, blank=False, decimal_places=2, max_digits=10,
                                 validators=[MinValueValidator(0.01)])
    costo = models.DecimalField(max_length=10, blank=False, decimal_places=2, max_digits=10, validators=[MinValueValidator(0)])
    imagen = models.ImageField('imagen', upload_to='images', null=True)
    cantidad = models.IntegerField(blank=False, default=0, validators=[MinValueValidator(0)])
    tipo = models.ForeignKey(TipoArticulo, to_field="id", on_delete=models.CASCADE)

    class Meta:
        db_table = "Articulo"
        verbose_name = "Articulos del negocio"
        verbose_name_plural = "Articulos"

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre
