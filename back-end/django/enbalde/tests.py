from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db.utils import DataError
from enbalde.models import Envio, TipoArticulo

# Create your tests here.

# TODO: monto podria tener default en 0

class EnvioTestCase(TestCase):
    RETIRO_EN_TIENDA = "Retiro en tienda"

    def test_envio_se_inicializa_correctamente(self):
        sut = Envio.objects.create(nombre=self.RETIRO_EN_TIENDA, monto=0)
        self.assertEqual(self.RETIRO_EN_TIENDA, sut.nombre)
        self.assertEqual(0, sut.monto)

    def test_nombre_es_el_string_por_defecto_de_envio(self):
        sut = Envio.objects.create(nombre=self.RETIRO_EN_TIENDA, monto=0)
        self.assertEqual(self.RETIRO_EN_TIENDA, sut.__str__())

    def test_nombre_es_el_unicode_por_defecto_de_envio(self):
        sut = Envio.objects.create(nombre=self.RETIRO_EN_TIENDA, monto=0)
        self.assertEqual(self.RETIRO_EN_TIENDA, sut.__unicode__())

    def test_monto_no_puede_ser_negativo(self):
        sut = Envio.objects.create(nombre=self.RETIRO_EN_TIENDA, monto=-1)
        with self.assertRaises(ValidationError):
            sut.full_clean()


class TipoArticuloTestCase(TestCase):
    TIPO_ARTICULO = "Balde"

    def test_nombre_es_el_string_por_defecto_de_envio(self):
        sut = TipoArticulo.objects.create(nombre=self.TIPO_ARTICULO)
        self.assertEqual(self.TIPO_ARTICULO, sut.__str__())

    def test_nombre_es_el_unicode_por_defecto_de_envio(self):
        sut = TipoArticulo.objects.create(nombre=self.TIPO_ARTICULO)
        self.assertEqual(self.TIPO_ARTICULO, sut.__unicode__())
