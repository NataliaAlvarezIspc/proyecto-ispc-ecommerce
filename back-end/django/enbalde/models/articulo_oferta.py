from django.db import models
from .articulo import Articulo
from .oferta import Oferta

class ArticulosEnOferta(models.Model):
    id = models.AutoField(primary_key=True)
    articulo = models.ForeignKey(Articulo, to_field='id', on_delete=models.CASCADE)
    oferta = models.ForeignKey(Oferta, to_field='id', on_delete=models.CASCADE)

    class Meta:
        db_table = "ArticulosEnOferta"
        verbose_name = "Articulos en Oferta"
        verbose_name_plural = "ArticulosEnOferta"

    def __unicode__(self):
        return u'{0} con oferta {1}'.format(self.articulo.nombre, self.oferta.nombre)

    def __str__(self):
        return '{0} con oferta {1}'.format(self.articulo.nombre, self.oferta.nombre)
