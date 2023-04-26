from model.articulo import Articulo

class Seleccion:
    def __init__(self, articulo: Articulo, cantidad: int):
        self.__articulo = articulo
        self.__cantidad = cantidad

    def obtener_articulo(self) -> Articulo:
        return self.__articulo

    def obtener_total(self) -> int:
        return self.__cantidad
