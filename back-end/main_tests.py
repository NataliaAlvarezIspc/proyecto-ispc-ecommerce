import unittest
from tests.articulo_tests import ArticuloTests
from tests.venta_tests import VentaTests
from tests.seleccion_tests import SeleccionTests

suite = unittest.TestSuite()

suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ArticuloTests))
suite.addTest(unittest.TestLoader().loadTestsFromTestCase(VentaTests))
suite.addTest(unittest.TestLoader().loadTestsFromTestCase(SeleccionTests))

unittest.TextTestRunner(verbosity=3).run(suite)
