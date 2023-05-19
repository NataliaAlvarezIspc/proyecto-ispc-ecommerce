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


class Articulo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=200, blank=False)
    descripcion = models.CharField(max_length=200, blank=False)
    precio = models.DecimalField(max_length=10, blank=False, decimal_places=2, max_digits=10)
    costo =  models.DecimalField(max_length=10, blank=False, decimal_places=2, max_digits=10)
    alicuota = models.DecimalField(max_length=10, blank=False, decimal_places=2, max_digits=10)
    imagen = models.CharField(max_length=512, blank=False)
    cantidad = models.IntegerField(blank=False, default=0)
    tipo = models.ForeignKey(TipoArticulo, to_field="id", on_delete=models.CASCADE)

    class Meta:
        db_table = "Articulo"
        verbose_name = "Articulos del negocio"
        verbose_name_plural = "Articulos"

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre


class Oferta(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=40, blank=False)
    descuento = models.DecimalField(max_length=4, blank=False, decimal_places=2, max_digits=4)
    fecha_vencimiento = models.DateField(blank=False)

    class Meta:
        db_table = "Oferta"
        verbose_name = "Ofertas de articulos"
        verbose_name_plural = "Ofertas"
    
    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre


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


class Usuario(models.Model):
    class TipoUsuario(models.IntegerChoices):
        ADMINISTRADOR = 1
        CLIENTE = 2

    id = models.AutoField(primary_key=True)
    tipo = models.IntegerField(choices=TipoUsuario.choices, blank=False)
    nombre = models.CharField(max_length=40, blank=False)
    apellido = models.CharField(max_length=40, blank=False)
    direccion = models.CharField(max_length=100, blank=False)
    telefono = models.CharField(max_length=20, blank=True)
    usuario = models.CharField(max_length=40, blank=False)
    clave = models.CharField(max_length=40, blank=False)
    email = models.CharField(max_length=45, blank=False)
    observaciones = models.CharField(max_length=200, blank=True)

    class Meta:
        db_table = "Usuario"
        verbose_name = "Listado de usuarios"
        verbose_name_plural = "Usuarios"

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre


class Carrito(models.Model):
    id = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(Usuario, to_field="id", on_delete=models.CASCADE)
    fecha = models.DateField(blank=False)

    class Meta:
        db_table = "Carrito"
        verbose_name = "Carrito de compra"
        verbose_name_plural = "Carritos"

    def __unicode__(self):
        return u'Carrito de {0}'.format(self.cliente.nombre)

    def __str__(self):
        return 'Carrito de {0}'.format(self.cliente.nombre)


class Seleccion(models.Model):
    id = models.AutoField(primary_key=True)
    cantidad = models.PositiveIntegerField(blank=False, default=0)
    carrito = models.ForeignKey(Carrito, to_field="id", on_delete=models.CASCADE)
    articulo = models.ForeignKey(Articulo, to_field="id", on_delete=models.CASCADE)

    class Meta:
        db_table = "Seleccion"
        verbose_name = "Seleccion de articulos"
        verbose_name_plural = "Selecciones"

    def __unicode__(self):
        return u'{0} dentro de carrito {1}'.format(self.articulo.nombre, self.carrito.id)

    def __str__(self):
        return '{0} dentro de carrito {1}'.format(self.articulo.nombre, self.carrito.id)

    
class Venta(models.Model):
    id = models.AutoField(primary_key=True) 
    numero = models.IntegerField(blank=False)
    comprobante = models.IntegerField(blank=False)
    fecha = models.DateField(blank=False)
    cliente = models.ForeignKey(Usuario, to_field="id", on_delete=models.CASCADE)
    neto = models.DecimalField(max_length=10, blank=False, decimal_places=2, max_digits=10)
    monto_iva = models.DecimalField(max_length=10, blank=False, decimal_places=2, max_digits=10)
    no_gravado = models.DecimalField(max_length=10, blank=False, decimal_places=2, max_digits=10)
    total = models.DecimalField(max_length=10, blank=False, decimal_places=2, max_digits=10)
    envio = models.ForeignKey(Envio, to_field="id", on_delete=models.CASCADE)
    carrito = models.ForeignKey(Carrito, to_field="id", on_delete=models.CASCADE)

    class Meta:
        db_table = "Venta"
        verbose_name = "Listado de Ventas"
        verbose_name_plural = "Ventas"

    def __unicode__(self):
        return u'Venta a {0} por {1} con envio {2}'.format(self.cliente.nombre, self.total, self.envio.nombre)

    def __str__(self):
        return 'Venta a {0} por {1} con envio {2}'.format(self.cliente.nombre, self.total, self.envio.nombre)
    
