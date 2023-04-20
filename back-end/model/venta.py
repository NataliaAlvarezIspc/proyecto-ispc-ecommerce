from datetime import date
from usuario import Usuario
from envio import Envio
from carrito import Carrito

class Venta:
    def __init__(self,id:int,numero:str,comprobante:str,fecha:date,usuario:Usuario,neto:float,
    monto_iva:float,no_gravado:float,total:float,envio:Envio,carrito:Carrito):
        self.__id = id
        self.__numero = numero
        self.__comprobante = comprobante
        self.__fecha = fecha
        self.__usuario = usuario
        self.__neto = neto
        self.__monto_iva = monto_iva
        self.__no_gravado = no_gravado
        self.__envio = envio
        self.__carrito = carrito
        
# Consultar sobre este método
    def vender(self) -> Carrito:
        return self.__carrito