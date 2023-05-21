from django.test import TestCase
from django.core.exceptions import ValidationError
from enbalde.models import Envio, TipoArticulo, Oferta, Usuario, Carrito
from datetime import date
from ddt import ddt, data


# Create your tests here.

# TODO: Envio.monto podria tener default en 0
# TODO: Oferta.descuento no puede ser menor 
USUARIO = "jperez"
CLAVE = "123456"
NOMBRE = "Juan"
APELLIDO = "Perez"
DIRECCION = "Calle Siempreviva 123"
TELEFONO = "1234-5678"
OBSERVACIONES = "Buen cliente"
FECHA_FUTURA = date(2099, 5, 30)
FECHA_PASADA = date(2020, 5, 30)

def crear_usuario_completo():
    return Usuario.objects.create(username=USUARIO, password=CLAVE, first_name=NOMBRE,
                                  last_name=APELLIDO, direccion=DIRECCION, telefono=TELEFONO,
                                  observaciones=OBSERVACIONES, tipo=Usuario.TipoUsuario.CLIENTE)


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
    TIPO_ARTICULO = "Balde"

    def test_tipo_articulo_se_inicializa_correctamente(self):
        sut = TipoArticulo.objects.create(nombre=self.TIPO_ARTICULO)
        self.assertEqual(self.TIPO_ARTICULO, sut.nombre)

    def test_nombre_es_el_string_por_defecto_de_envio(self):
        sut = TipoArticulo.objects.create(nombre=self.TIPO_ARTICULO)
        self.assertEqual(self.TIPO_ARTICULO, sut.__str__())
        self.assertEqual(self.TIPO_ARTICULO, sut.__unicode__())


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

    def test_nombre_es_el_string_por_defecto_de_oferta(self):
        sut = Usuario.objects.create(first_name=NOMBRE, last_name=APELLIDO)
        self.assertEqual(NOMBRE, sut.__str__())
        self.assertEqual(NOMBRE, sut.__unicode__())
