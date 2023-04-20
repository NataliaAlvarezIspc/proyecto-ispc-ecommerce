from articulo import Articulo

class Seleccion:
    def __init__(self,articulo:Articulo,cantidad:int):
        self.__articulo = articulo
        self.__cantidad = cantidad


# Consultar sobre este método.
    def obtener_total(self) -> float:
        return self.__cantidad

