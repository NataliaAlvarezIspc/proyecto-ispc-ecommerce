import unittest
from model.usuario import Usuario
import tests.constantes as C

class UsuarioTests(unittest.TestCase):
    def test_inicializar_usuario_correctamente(self):
        sut = Usuario(C.ID_USUARIO, C.NOMBRE_USUARIO, C.APELLIDO_USUARIO, C.DNI_USUARIO, C.USUARIO_USUARIO, C.CLAVE_USUARIO, C.EMAIL_USUARIO)
        self.assertEqual(C.ID_USUARIO, sut.obtener_id())
        self.assertEqual(C.NOMBRE_USUARIO, sut.obtener_nombre())
        self.assertEqual(C.APELLIDO_USUARIO, sut.obtener_apellido())
        self.assertEqual(C.DNI_USUARIO, sut.obtener_dni())
        self.assertEqual(C.USUARIO_USUARIO, sut.obtener_usuario())
        self.assertEqual(C.CLAVE_USUARIO, sut.obtener_password())
        self.assertEqual(C.EMAIL_USUARIO, sut.obtener_email())

if __name__ == "__main__":
    unittest.main()
