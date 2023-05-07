from model.deposito import Deposito
from model.libro_diario import LibroDiario
from model.agenda import Agenda


class BaseDeDatos:
    def __init__(self, deposito: Deposito, libro_diario: LibroDiario, agenda: Agenda):
        self.__deposito = deposito
        self.__libro_diario = libro_diario
        self.__agenda = agenda

    @property
    def Deposito(self) -> Deposito:
        return self.__deposito

    @property
    def LibroDiario(self) -> LibroDiario:
        return self.__libro_diario

    @property
    def Agenda(self) -> Agenda:
        return self.__agenda
