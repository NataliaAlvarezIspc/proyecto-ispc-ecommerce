from abc import ABC, abstractmethod
from model.articulo import Articulo

class Deposito(ABC):
    @abstractmethod
    def agregar(self) -> None:
        pass

    @abstractmethod
    def eliminar(self) -> None:
        pass

    @abstractmethod
    def modificar(self) -> None:
        pass

    @abstractmethod
    def listar(self) -> list[Articulo]:
        pass
