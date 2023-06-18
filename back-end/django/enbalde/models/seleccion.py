from django.db import models
from django.core.validators import MinValueValidator
from .articulo import Articulo
from .carrito import Carrito


class Seleccion(models.Model):
    id = models.AutoField(primary_key=True)
    cantidad = models.PositiveIntegerField(blank=False, default=1, validators=[MinValueValidator(1)])
    carrito = models.ForeignKey(Carrito, to_field="id", on_delete=models.CASCADE)
    articulo = models.ForeignKey(Articulo, to_field="id", on_delete=models.CASCADE)

    class Meta:
        db_table = "Seleccion"
        verbose_name = "Seleccion de articulos"
        verbose_name_plural = "Selecciones"

    def __unicode__(self):
        return u'{0} dentro de carrito {1} de {2}'.format(self.articulo.nombre, self.carrito.id,
                                                          self.carrito.cliente.first_name)

    def __str__(self):
        return '{0} dentro de carrito {1} de {2}'.format(self.articulo.nombre, self.carrito.id,
                                                         self.carrito.cliente.first_name)
