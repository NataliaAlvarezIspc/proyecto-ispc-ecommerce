import unittest
from model.cliente import Cliente
import tests.constantes as C

class ClienteTests(unittest.TestCase):
    def test_inicializar_cliente_correctamente(self):
        sut = Cliente(C.ID_CLIENTE, C.NOMBRE_CLIENTE, C.APELLIDO_CLIENTE, C.DNI_CLIENTE, C.USUARIO_CLIENTE, C.CLAVE_CLIENTE, C.EMAIL_CLIENTE)
        self.assertEqual(C.ID_CLIENTE, sut.obtener_id())
        self.assertEqual(C.NOMBRE_CLIENTE, sut.obtener_nombre())
        self.assertEqual(C.APELLIDO_CLIENTE, sut.obtener_apellido())
        self.assertEqual(C.DNI_CLIENTE, sut.obtener_dni())
        self.assertEqual(C.USUARIO_CLIENTE, sut.obtener_usuario())
        self.assertEqual(C.CLAVE_CLIENTE, sut.obtener_password())
        self.assertEqual(C.EMAIL_CLIENTE, sut.obtener_email())

if __name__ == "__main__":
    unittest.main()
