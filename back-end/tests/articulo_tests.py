import unittest
from model.articulo import Articulo
import tests.constantes as C


class ArticuloTests(unittest.TestCase):
    def test_inicializar_articulo_correctamente(self):
        sut = Articulo(C.ID_ARTICULO, C.DESCRIPCION_ARTICULO, C.TIPO_ARTICULO, C.PRECIO_ARTICULO, C.COSTO_ARTICULO,
                       C.ALICUOTA_ARTICULO, C.IMAGEN_ARTICULO)
        self.assertEqual(C.ID_ARTICULO, sut.obtener_id())
        self.assertEqual(C.DESCRIPCION_ARTICULO, sut.obtener_descripcion())
        self.assertEqual(C.TIPO_ARTICULO, sut.obtener_tipo())
        self.assertEqual(C.PRECIO_ARTICULO, sut.obtener_precio())
        self.assertEqual(C.COSTO_ARTICULO, sut.obtener_costo())
        self.assertEqual(C.ALICUOTA_ARTICULO, sut.obtener_alicuota())
        self.assertEqual(C.IMAGEN_ARTICULO, sut.obtener_imagen())


if __name__ == "__main__":
    unittest.main()
