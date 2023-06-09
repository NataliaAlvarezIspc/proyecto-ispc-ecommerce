from django.test import TestCase
from django.core.exceptions import ValidationError
from enbalde.models import Envio, TipoArticulo, Oferta, Usuario, Carrito, Articulo, Seleccion, ArticulosEnOferta, Venta
from django.utils import timezone
from ddt import ddt, data


# Create your tests here.

# TODO: Envio.monto podria tener default en 0
# TODO: Articulo.precio no puede ser menor que Articulo.costo

USUARIO = "jperez"
CLAVE = "123456"
NOMBRE = "Juan"
APELLIDO = "Perez"
DIRECCION = "Calle Siempreviva 123"
TELEFONO = "1234-5678"
OBSERVACIONES = "Buen cliente"
FECHA_FUTURA = timezone.datetime(2099, 5, 30, tzinfo=timezone.get_current_timezone())
FECHA_PASADA = timezone.datetime(2020, 5, 30, tzinfo=timezone.get_current_timezone())
ARTICULO = "Helado de chocolate"
DESCRIPCION = "Un helado muy rico de chocolate con chips"
PRECIO = 1100
COSTO = 400
IMAGEN = "/assets/chocolate.png"
CANTIDAD = 13
TIPO_ARTICULO = "Balde"
OFERTA = "10% Off"
ENVIO = "Retiro en tienda"
ENVIO_MINUSCULA = ENVIO.lower()


def crear_usuario_completo():
    return Usuario.objects.create(username=USUARIO, password=CLAVE, first_name=NOMBRE,
                                  last_name=APELLIDO, direccion=DIRECCION, telefono=TELEFONO,
                                  observaciones=OBSERVACIONES, tipo=Usuario.TipoUsuario.CLIENTE)


def crear_tipo_de_articulo():
    return TipoArticulo.objects.create(nombre=TIPO_ARTICULO)


def crear_articulo(nombre=ARTICULO, descripcion=DESCRIPCION, precio=PRECIO, costo=COSTO, imagen=IMAGEN, cantidad=CANTIDAD):
    tipo_de_articulo = crear_tipo_de_articulo()
    return Articulo.objects.create(nombre=nombre, descripcion=descripcion, precio=precio, costo=costo, imagen=imagen,
                                   cantidad=cantidad, tipo=tipo_de_articulo)


def crear_envio(nombre=ENVIO, monto=0):
    return Envio.objects.create(nombre=nombre, monto=monto)


def crear_carrito(fecha=FECHA_FUTURA):
    cliente = crear_usuario_completo()
    return Carrito.objects.create(cliente=cliente, fecha=fecha)


def crear_oferta(nombre=OFERTA, descuento=10, fecha_vencimiento=FECHA_FUTURA):
    return Oferta.objects.create(nombre=nombre, descuento=descuento, fecha_vencimiento=fecha_vencimiento)


def crear_venta(numero=1, comprobante=2, fecha=FECHA_PASADA, total=1500):
    envio = crear_envio()
    carrito = crear_carrito()
    return Venta.objects.create(numero=numero, comprobante=comprobante, fecha=fecha, total=total, envio=envio, carrito=carrito)


class EnvioTestCase(TestCase):
    def test_envio_se_inicializa_correctamente(self):
        sut = crear_envio()
        self.assertEqual(ENVIO, sut.nombre)
        self.assertEqual(0, sut.monto)

    def test_nombre_es_el_string_por_defecto_de_envio(self):
        sut = crear_envio()
        self.assertEqual(ENVIO, sut.__str__())
        self.assertEqual(ENVIO, sut.__unicode__())

    def test_monto_no_puede_ser_negativo(self):
        sut = crear_envio(monto=-1)
        with self.assertRaisesMessage(ValidationError, "Ensure this value is greater than or equal to 0."):
            sut.full_clean()


class TipoArticuloTestCase(TestCase):
    def test_tipo_articulo_se_inicializa_correctamente(self):
        sut = crear_tipo_de_articulo()
        self.assertEqual(TIPO_ARTICULO, sut.nombre)

    def test_nombre_es_el_string_por_defecto_de_envio(self):
        sut = crear_tipo_de_articulo()
        self.assertEqual(TIPO_ARTICULO, sut.__str__())
        self.assertEqual(TIPO_ARTICULO, sut.__unicode__())


@ddt
class OfertaTestCase(TestCase):
    def test_oferta_se_inicializa_correctamente(self):
        sut = crear_oferta()
        self.assertEqual(OFERTA, sut.nombre)
        self.assertEqual(10, sut.descuento)
        self.assertEqual(FECHA_FUTURA, sut.fecha_vencimiento)

    @data(0, -1)
    def test_descuento_no_puede_ser_invalido(self, descuento_invalido: int):
        sut = crear_oferta(descuento=descuento_invalido)
        with self.assertRaisesMessage(ValidationError, "Ensure this value is greater than or equal to 0.01."):
            sut.full_clean()

    def test_fecha_de_vencimiento_no_puede_ser_pasada(self):
        sut = crear_oferta(fecha_vencimiento=FECHA_PASADA)
        with self.assertRaisesMessage(ValidationError, "La fecha no puede ser pasada."):
            sut.full_clean()

    def test_nombre_es_el_string_por_defecto_de_oferta(self):
        sut = crear_oferta()
        self.assertEqual(OFERTA, sut.__str__())
        self.assertEqual(OFERTA, sut.__unicode__())


class UsuarioTestCase(TestCase):
    def test_usuario_se_inicializa_correctamente(self):
        sut = crear_usuario_completo()
        self.assertEqual(USUARIO, sut.username)
        self.assertEqual(CLAVE, sut.password)
        self.assertEqual(NOMBRE, sut.first_name)
        self.assertEqual(APELLIDO, sut.last_name)
        self.assertEqual(DIRECCION, sut.direccion)
        self.assertEqual(TELEFONO, sut.telefono)
        self.assertEqual(OBSERVACIONES, sut.observaciones)
        self.assertEqual(Usuario.TipoUsuario.CLIENTE, sut.tipo)

    def test_nombre_es_el_string_por_defecto_de_usuario(self):
        sut = Usuario.objects.create(first_name=NOMBRE, last_name=APELLIDO)
        self.assertEqual(NOMBRE, sut.__str__())
        self.assertEqual(NOMBRE, sut.__unicode__())


class CarritoTestCase(TestCase):
    def test_carrito_se_inicializa_correctamente(self):
        sut = crear_carrito()
        self.assertEqual(USUARIO, sut.cliente.username)
        self.assertEqual(FECHA_FUTURA, sut.fecha)

    def test_fecha_no_puede_ser_pasada(self):
        sut = crear_carrito(fecha=FECHA_PASADA)
        with self.assertRaisesMessage(ValidationError, "La fecha no puede ser pasada."):
            sut.full_clean()

    def test_nombre_del_cliente_del_carrito_es_el_string_por_defecto_de_carrito(self):
        nombre_del_carrito = f"Carrito de {NOMBRE}"
        sut = crear_carrito()
        self.assertEqual(nombre_del_carrito, sut.__str__())
        self.assertEqual(nombre_del_carrito, sut.__unicode__())


@ddt
class ArticuloTestCase(TestCase):
    def test_articulo_se_inicializa_correctamente(self):
        sut = crear_articulo()
        self.assertEqual(ARTICULO, sut.nombre)
        self.assertEqual(DESCRIPCION, sut.descripcion)
        self.assertEqual(PRECIO, sut.precio)
        self.assertEqual(COSTO, sut.costo)
        self.assertEqual(IMAGEN, sut.imagen)
        self.assertEqual(CANTIDAD, sut.cantidad)
        self.assertEqual(TIPO_ARTICULO, sut.tipo.nombre)

    def test_cantidad_no_puede_ser_negativa(self):
        sut = crear_articulo(cantidad=-1)
        with self.assertRaisesMessage(ValidationError, "Ensure this value is greater than or equal to 0."):
            sut.full_clean()

    @data(0, -1)
    def test_precio_no_puede_ser_invalida(self, precio_invalido):
        sut = crear_articulo(precio=precio_invalido)
        with self.assertRaisesMessage(ValidationError, "Ensure this value is greater than or equal to 0.01."):
            sut.full_clean()

    def test_costo_no_puede_ser_negativo(self):
        sut = crear_articulo(costo=-1)
        with self.assertRaisesMessage(ValidationError, "Ensure this value is greater than or equal to 0."):
            sut.full_clean()

    def test_nombre_del_articulo_es_el_string_por_defecto_de_articulo(self):
        sut = crear_articulo()
        self.assertEqual(ARTICULO, sut.__str__())
        self.assertEqual(ARTICULO, sut.__unicode__())


class SeleccionTestCase(TestCase):
    def test_seleccion_se_inicializa_correctamente(self):
        articulo = crear_articulo()
        carrito = crear_carrito()
        sut = Seleccion.objects.create(cantidad=2, carrito=carrito, articulo=articulo)
        self.assertEqual(ARTICULO, sut.articulo.nombre)
        self.assertEqual(NOMBRE, sut.carrito.cliente.first_name)
        self.assertEqual(2, sut.cantidad)

    def test_cantidad_no_puede_ser_cero(self):
        articulo = crear_articulo()
        carrito = crear_carrito()
        sut = Seleccion.objects.create(cantidad=0, carrito=carrito, articulo=articulo)
        with self.assertRaisesMessage(ValidationError, "Ensure this value is greater than or equal to 1."):
            sut.full_clean()

    def test_nombre_de_la_seleccion_es_el_articulo_dentro_del_carrito(self):
        descripcion = f"{ARTICULO} dentro de carrito 1 de {NOMBRE}"
        articulo = crear_articulo()
        carrito = crear_carrito()
        sut = Seleccion.objects.create(cantidad=2, carrito=carrito, articulo=articulo)
        self.assertEqual(descripcion, sut.__str__())
        self.assertEqual(descripcion, sut.__unicode__())


class ArticulosEnOfertaTestCase(TestCase):
    def test_articulos_en_oferta_se_inicializa_correctamente(self):
        articulo = crear_articulo()
        oferta = crear_oferta()
        sut = ArticulosEnOferta.objects.create(articulo=articulo, oferta=oferta)
        self.assertEqual(ARTICULO, sut.articulo.nombre)
        self.assertEqual(OFERTA, sut.oferta.nombre)

    def test_nombre_de_articulo_y_oferta_es_el_string_por_defecto(self):
        descripcion = f'{ARTICULO} con oferta {OFERTA}'
        articulo = crear_articulo()
        oferta = crear_oferta()
        sut = ArticulosEnOferta.objects.create(articulo=articulo, oferta=oferta)
        self.assertEqual(descripcion, sut.__str__())
        self.assertEqual(descripcion, sut.__unicode__())


@ddt
class VentaTestCase(TestCase):
    def test_venta_se_inicializa_correctamente(self):
        sut = crear_venta()
        self.assertEqual(1, sut.numero)
        self.assertEqual(2, sut.comprobante)
        self.assertEqual(FECHA_PASADA, sut.fecha)
        self.assertEqual(1500, sut.total)
        self.assertEqual(ENVIO, sut.envio.nombre)
        self.assertEqual(NOMBRE, sut.carrito.cliente.first_name)

    def test_la_fecha_de_venta_no_puede_ser_futura(self):
        sut = crear_venta(fecha=FECHA_FUTURA)
        with self.assertRaisesMessage(ValidationError, "La fecha no puede ser futura."):
            sut.full_clean()

    @data(0, -1)
    def test_el_total_no_puede_ser_invalido(self, total_invalido):
        sut = crear_venta(total=total_invalido)
        with self.assertRaisesMessage(ValidationError, "Ensure this value is greater than or equal to 0.01."):
            sut.full_clean()

    def test_descripcion_de_venta_es_el_string_por_defecto(self):
        descripcion = f"Venta a {NOMBRE} por 1500 con {ENVIO_MINUSCULA}"
        sut = crear_venta()
        self.assertEqual(descripcion, sut.__str__())
        self.assertEqual(descripcion, sut.__unicode__())
