from model.articulo import Articulo


class Seleccion:
    def __init__(self, articulo: Articulo, cantidad: int):
        self.__articulo = articulo
        self.__cantidad = cantidad
        self.__total = self.__articulo.obtener_precio() * self.__cantidad

    def obtener_articulo(self) -> Articulo:
        return self.__articulo

    def obtener_cantidad(self) -> int:
        return self.__cantidad

    def obtener_total(self) -> float:
        return self.__total
