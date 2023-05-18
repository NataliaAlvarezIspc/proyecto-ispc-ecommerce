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

    class Meta:
        db_table = "TipoArticulo"
        verbose_name = 'Tipos de articulos disponibles'
        verbose_name_plural = "TipoArticulos"

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre


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

class Oferta(models.Model):
    id_oferta = models.AutoField(primary_key=True)
    porcentaje = models.DecimalField(max_length=4, blank=False, decimal_places=2, max_digits=4)
    fecha_vencimiento = models.DateField(blank=False)

    class Meta:
        db_table = "Oferta"
        verbose_name = "Ofertas de productos"
        verbose_name_plural = "Ofertas"
    
    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre
class OfertaArticulo(models.Model):
    id_ofertaarticulos = models.AutoField(primary_key=True)
    id_articulos = models.ForeignKey(Producto, to_field='id', on_delete=models.CASCADE)
    id_ofertas = models.ForeignKey(Oferta, to_field='id_oferta', on_delete=models.CASCADE)

    class Meta:
        db_table = "OfertaArticulo"
        verbose_name = "Ofertas de productos"
        verbose_name_plural = "OfertasArticulos"

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre
    
class Usuario(models.Model):
    id_usuario = models.AutoField(primary_key=True)
    tipo_usuario = models.IntegerField(blank=False)
    nombre = models.CharField(max_length=40, blank=False)
    apellido = models.CharField(max_length=40, blank=False)
    direccion = models.CharField(max_length=100, blank=False)
    usuario = models.CharField(max_length=40, blank=False)
    clave = models.CharField(max_length=40, blank=False)
    email = models.CharField(max_length=45, blank=False)
    observaciones = models.CharField(max_length=200)

    class Meta:
        db_table = "Usuario"
        verbose_name = "Listado e usuarios"
        verbose_name_plural = "Usuarios"

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre