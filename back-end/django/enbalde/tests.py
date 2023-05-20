from django.test import TestCase
from enbalde.models import Envio

# Create your tests here.

class EnvioTestCase(TestCase):
    def test_envio_se_inicializa_correctamente(self):
        sut = Envio.objects.create(id=3, nombre="Retiro en tienda", monto=0)
        self.assertEqual(3, sut.id)
        self.assertEqual("Retiro en tienda", sut.nombre)
        self.assertEqual(0, sut.monto)
