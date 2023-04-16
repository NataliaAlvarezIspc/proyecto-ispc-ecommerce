from database import BaseDeDatos
from deposito import Deposito
from articulo import Articulo

class DepositoVirtual(Deposito):
    def __init__(self, articulos: list[Articulo]):
        self.__articulos = articulos

    def agregar() -> None:
        pass

    def eliminar() -> None:
        pass

    def modificar() -> None:
        pass

    def listar() -> list[Articulo]:
        return self.__articulos
