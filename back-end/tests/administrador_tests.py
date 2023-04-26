import unittest
from model.administrador import Administrador
import tests.constantes as C

class AdministradorTests(unittest.TestCase):
    def test_inicializar_administrador_correctamente(self):
        sut = Administrador(C.ID_ADMINISTRADOR, C.NOMBRE_ADMINISTRADOR, C.APELLIDO_ADMINISTRADOR, C.DNI_ADMINISTRADOR,
                            C.USUARIO_ADMINISTRADOR, C.CLAVE_ADMINISTRADOR, C.EMAIL_ADMINISTRADOR)
        self.assertEqual(C.ID_ADMINISTRADOR, sut.obtener_id())
        self.assertEqual(C.NOMBRE_ADMINISTRADOR, sut.obtener_nombre())
        self.assertEqual(C.APELLIDO_ADMINISTRADOR, sut.obtener_apellido())
        self.assertEqual(C.DNI_ADMINISTRADOR, sut.obtener_dni())
        self.assertEqual(C.USUARIO_ADMINISTRADOR, sut.obtener_usuario())
        self.assertEqual(C.CLAVE_ADMINISTRADOR, sut.obtener_password())
        self.assertEqual(C.EMAIL_ADMINISTRADOR, sut.obtener_email())

if __name__ == "__main__":
    unittest.main()
