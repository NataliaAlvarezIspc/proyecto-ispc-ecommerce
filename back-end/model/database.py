from deposito import Deposito

class BaseDeDatos:
    def __init__(self, deposito: Deposito):
        self.__deposito = deposito

    @property
    def Deposito(self) -> Deposito:
        return self.__deposito
