import unittest
from tests.articulo_tests import ArticuloTests
from tests.venta_tests import VentaTests

suite = unittest.TestSuite()

suite.addTest(unittest.TestLoader().loadTestsFromTestCase(ArticuloTests))
suite.addTest(unittest.TestLoader().loadTestsFromTestCase(VentaTests))

unittest.TextTestRunner(verbosity=3).run(suite)
