import unittest
from model.articulo import Articulo
from model.seleccion import Seleccion
import tests.constantes as C

class SeleccionTests(unittest.TestCase):
    def test_inicializar_seleccion_correctamente(self):
        unArticulo = Articulo(C.ID_ARTICULO, C.DESCRIPCION_ARTICULO, C.TIPO_ARTICULO, C.PRECIO_ARTICULO, C.COSTO_ARTICULO, C.ALICUOTA_ARTICULO, C.IMAGEN_ARTICULO)
        sut = Seleccion(unArticulo, C.CANTIDAD_SELECCION)

        self.assertEqual(unArticulo, sut.obtener_articulo())
        self.assertEqual(C.CANTIDAD_SELECCION, sut.obtener_cantidad())
        self.assertEqual(C.TOTAL_SELECCION, sut.obtener_total())

if __name__ == "__main__":
    unittest.main()
