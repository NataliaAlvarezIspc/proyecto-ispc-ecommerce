from abc import ABC, abstractmethod
from model.venta import Venta


class LibroDiario(ABC):
    @abstractmethod
    def crear(self) -> Venta:
        pass

    def listar(self) -> list[Venta]:
        pass
