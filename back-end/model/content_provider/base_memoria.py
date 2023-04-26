from model.deposito import Deposito
from model.agenda import Agenda
from model.libro_diario import LibroDiario
from model.articulo import Articulo
from model.usuario import Usuario
from model.venta import Venta
from model.database import BaseDeDatos

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

class AgendaVirtual(Agenda):
    def __init__(self, usuarios: list[Usuario]):
        self.__usuarios = usuarios

    def agregar(self):
        pass

    def actualizar(self):
        pass

    def listar(self) -> list[Usuario]:
        pass

    def buscar(self) -> Usuario:
        pass
   
class LibroDiarioVirtual(LibroDiario):
    def __init__(self, ventas: list[Venta]):
        self.__ventas = ventas

    def crear(self) -> Venta:
        pass

    def listar(self) -> list[Venta]:
        pass

class CreadorDeBaseDeDatosVirtual:
    def __init__(self):
        self.__agenda = AgendaVirtual([])
        self.__libro_diario = LibroDiarioVirtual([])
        self.__deposito = DepositoVirtual([])

    def con_agenda(self, agenda: Agenda):
        self.__agenda = agenda
        return self

    def con_libro_diario(self, libro_diario: LibroDiario):
        self.__libro_diario = libro_diario
        return self

    def con_deposito(self, deposito: Deposito):
        self.__deposito = deposito
        return self

    def construir(self) -> BaseDeDatos:
        return BaseDeDatos(self.__deposito, self.__libro_diario, self.__agenda)
