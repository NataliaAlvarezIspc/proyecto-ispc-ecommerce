from django.test import TestCase
from django.core.exceptions import ValidationError
from enbalde.models import Envio, TipoArticulo, Oferta, Usuario, Carrito, Articulo
from datetime import date
from ddt import ddt, data


# Create your tests here.

# TODO: Envio.monto podria tener default en 0
# TODO: Oferta.descuento no puede ser menor 
# TODO: Articulo.precio no puede ser menor que Articulo.costo

USUARIO = "jperez"
CLAVE = "123456"
NOMBRE = "Juan"
APELLIDO = "Perez"
DIRECCION = "Calle Siempreviva 123"
TELEFONO = "1234-5678"
OBSERVACIONES = "Buen cliente"
FECHA_FUTURA = date(2099, 5, 30)
FECHA_PASADA = date(2020, 5, 30)
ARTICULO = "Helado de chocolate"
DESCRIPCION = "Un helado muy rico de chocolate con chips"
PRECIO = 1100
COSTO = 400
IMAGEN = "/assets/chocolate.png"
CANTIDAD = 13
TIPO_ARTICULO = "Balde"


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


class EnvioTestCase(TestCase):
    RETIRO_EN_TIENDA = "Retiro en tienda"

    def test_envio_se_inicializa_correctamente(self):
        sut = Envio.objects.create(nombre=self.RETIRO_EN_TIENDA, monto=0)
        self.assertEqual(self.RETIRO_EN_TIENDA, sut.nombre)
        self.assertEqual(0, sut.monto)

    def test_nombre_es_el_string_por_defecto_de_envio(self):
        sut = Envio.objects.create(nombre=self.RETIRO_EN_TIENDA, monto=0)
        self.assertEqual(self.RETIRO_EN_TIENDA, sut.__str__())
        self.assertEqual(self.RETIRO_EN_TIENDA, sut.__unicode__())

    def test_monto_no_puede_ser_negativo(self):
        sut = Envio.objects.create(nombre=self.RETIRO_EN_TIENDA, monto=-1)
        with self.assertRaises(ValidationError):
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
    OFERTA = "10% Off"

    def test_oferta_se_inicializa_correctamente(self):
        sut = Oferta.objects.create(nombre=self.OFERTA, descuento=10, fecha_vencimiento=FECHA_FUTURA)
        self.assertEqual(self.OFERTA, sut.nombre)
        self.assertEqual(10, sut.descuento)
        self.assertEqual(FECHA_FUTURA, sut.fecha_vencimiento)

    @data(0, -1)
    def test_descuento_no_puede_ser_invalido(self, descuento_invalido: int):
        sut = Oferta.objects.create(nombre=self.OFERTA, descuento=descuento_invalido, fecha_vencimiento=FECHA_FUTURA)
        with self.assertRaises(ValidationError):
            sut.full_clean()

    def test_fecha_de_vencimiento_no_puede_ser_pasada(self):
        sut = Oferta.objects.create(nombre=self.OFERTA, descuento=10, fecha_vencimiento=FECHA_PASADA)
        with self.assertRaises(ValidationError):
            sut.full_clean()

    def test_nombre_es_el_string_por_defecto_de_oferta(self):
        sut = Oferta.objects.create(nombre=self.OFERTA, descuento=10, fecha_vencimiento=FECHA_FUTURA)
        self.assertEqual(self.OFERTA, sut.__str__())
        self.assertEqual(self.OFERTA, sut.__unicode__())


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
        cliente = crear_usuario_completo()
        sut = Carrito.objects.create(cliente=cliente, fecha=FECHA_FUTURA)
        self.assertEqual(USUARIO, sut.cliente.username)
        self.assertEqual(FECHA_FUTURA, sut.fecha)

    def test_fecha_no_puede_ser_pasada(self):
        cliente = crear_usuario_completo()
        sut = Carrito.objects.create(cliente=cliente, fecha=FECHA_PASADA)
        with self.assertRaises(ValidationError):
            sut.full_clean()

    def test_nombre_del_cliente_del_carrito_es_el_string_por_defecto_de_carrito(self):
        nombre_del_carrito = f"Carrito de {NOMBRE}"
        cliente = crear_usuario_completo()
        sut = Carrito.objects.create(cliente=cliente, fecha=FECHA_FUTURA)
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
        with self.assertRaises(ValidationError):
            sut.full_clean()

    @data(0, -1)
    def test_precio_no_puede_ser_cero_o_negativo(self, precio_invalido):
        sut = crear_articulo(precio=precio_invalido)
        with self.assertRaises(ValidationError):
            sut.full_clean()

    def test_costo_no_puede_ser_negativo(self):
        sut = crear_articulo(costo=-1)
        with self.assertRaises(ValidationError):
            sut.full_clean()

    def test_nombre_del_articulo_es_el_string_por_defecto_de_articulo(self):
        sut = crear_articulo()
        self.assertEqual(ARTICULO, sut.__str__())
        self.assertEqual(ARTICULO, sut.__unicode__())

