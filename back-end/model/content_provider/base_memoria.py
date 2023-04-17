from database import BaseDeDatos
from deposito import Deposito
from articulo import Articulo

class DepositoVirtual(Deposito):
    def __init__(self, articulos: list[Articulo]):
        self.__articulos = articulos

    def agregar(self) -> None:
        pass

    def eliminar(self) -> None:
        pass

    def modificar(self) -> None:
        pass

    def listar(self) -> list[Articulo]:
        return self.__articulos
