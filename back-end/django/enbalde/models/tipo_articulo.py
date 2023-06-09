from django.db import models

class TipoArticulo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=40, blank=False)

    class Meta:
        db_table = "TipoArticulo"
        verbose_name = 'Tipos de articulos disponibles'
        verbose_name_plural = "TipoArticulos"

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre
