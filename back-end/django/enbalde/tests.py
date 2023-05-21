from django.test import TestCase
from django.core.exceptions import ValidationError
from enbalde.models import Envio, TipoArticulo, Oferta
from datetime import date
from ddt import ddt, data


# Create your tests here.

# TODO: Envio.monto podria tener default en 0
# TODO: Oferta.descuento no puede ser menor 

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
    FECHA_FUTURA = date(2099, 5, 30)
    FECHA_PASADA = date(2020, 5, 30)

    def test_oferta_se_inicializa_correctamente(self):
        sut = Oferta.objects.create(nombre=self.OFERTA, descuento=10, fecha_vencimiento=self.FECHA_FUTURA)
        self.assertEqual(self.OFERTA, sut.nombre)
        self.assertEqual(10, sut.descuento)
        self.assertEqual(self.FECHA_FUTURA, sut.fecha_vencimiento)

    @data(0, -1)
    def test_descuento_no_puede_ser_invalido(self, descuento_invalido: int):
        sut = Oferta.objects.create(nombre=self.OFERTA, descuento=descuento_invalido, fecha_vencimiento=self.FECHA_FUTURA)
        with self.assertRaises(ValidationError):
            sut.full_clean()

    def test_fecha_de_vencimiento_no_puede_ser_pasada(self):
        sut = Oferta.objects.create(nombre=self.OFERTA, descuento=10, fecha_vencimiento=self.FECHA_PASADA)
        with self.assertRaises(ValidationError):
            sut.full_clean()

    def test_nombre_es_el_string_por_defecto_de_oferta(self):
        sut = Oferta.objects.create(nombre=self.OFERTA, descuento=10, fecha_vencimiento=self.FECHA_FUTURA)
        self.assertEqual(self.OFERTA, sut.__str__())
        self.assertEqual(self.OFERTA, sut.__unicode__())

