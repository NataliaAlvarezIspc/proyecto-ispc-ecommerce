import unittest
from model.venta import Venta
from model.envio import RetiroEnTienda
from model.cliente import Cliente
from model.carrito import Carrito
import tests.constantes as C


class VentaTests(unittest.TestCase):
    def test_inicializar_venta_correctamente(self):
        unCliente = Cliente(C.ID_CLIENTE, C.NOMBRE_CLIENTE, C.APELLIDO_CLIENTE, C.DNI_CLIENTE, C.USUARIO_CLIENTE,
                            C.CLAVE_CLIENTE, C.EMAIL_CLIENTE)
        unEnvio = RetiroEnTienda()
        unCarrito = Carrito()
        sut = Venta(C.ID_VENTA, C.NUMERO_VENTA, C.COMPROBANTE_VENTA, C.FECHA_VENTA, unCliente, C.NETO_VENTA, C.MONTO_IVA_VENTA,
                    C.NO_GRAVADO_VENTA, C.TOTAL_VENTA, unEnvio, unCarrito)
        self.assertEqual(C.ID_VENTA, sut.obtener_id())
        self.assertEqual(C.NUMERO_VENTA, sut.obtener_numero())
        self.assertEqual(C.COMPROBANTE_VENTA, sut.obtener_comprobante())
        self.assertEqual(C.FECHA_VENTA, sut.obtener_fecha())
        self.assertEqual(unCliente, sut.obtener_cliente())
        self.assertEqual(C.NETO_VENTA, sut.obtener_neto())
        self.assertEqual(C.MONTO_IVA_VENTA, sut.obtener_monto_iva())
        self.assertEqual(C.NO_GRAVADO_VENTA, sut.obtener_no_gravado())
        self.assertEqual(C.TOTAL_VENTA, sut.obtener_total())
        self.assertEqual(unEnvio, sut.obtener_envio())
        self.assertEqual(unCarrito, sut.obtener_carrito())


if __name__ == "__main__":
    unittest.main()
