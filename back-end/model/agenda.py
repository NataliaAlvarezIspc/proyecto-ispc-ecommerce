from abc import ABC, abstractmethod
from model.usuario import Usuario

class Agenda(ABC):
    @abstractmethod
    def agregar(self):
        pass

    @abstractmethod
    def actualizar(self):
        pass

    @abstractmethod
    def listar(self) -> list[Usuario]:
        pass

    @abstractmethod
    def buscar(self) -> Usuario:
        pass
