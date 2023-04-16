from abc import ABC, abstractmethod

class Deposito(ABC):
    @abstractmethod
    def agregar() -> None:
        pass

    @abstractmethod
    def eliminar() -> None:
        pass

    @abstractmethod
    def modificar() -> None:
        pass

    @abstractmethod
    def listar() -> list[Articulo]:
        pass
