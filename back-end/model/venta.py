from datetime import date
from model.cliente import Cliente
from model.envio import Envio
from model.carrito import Carrito


class Venta:
    def __init__(self, id: int, numero: str, comprobante: str, fecha: date, cliente: Cliente, neto: float,
                 monto_iva: float, no_gravado: float, total: float, envio: Envio, carrito: Carrito):
        self.__id = id
        self.__numero = numero
        self.__comprobante = comprobante
        self.__fecha = fecha
        self.__cliente = cliente
        self.__neto = neto
        self.__monto_iva = monto_iva
        self.__no_gravado = no_gravado
        self.__total = total
        self.__envio = envio
        self.__carrito = carrito

    def obtener_id(self) -> int:
        return self.__id

    def obtener_numero(self) -> int:
        return self.__numero

    def obtener_comprobante(self) -> str:
        return self.__comprobante

    def obtener_fecha(self) -> date:
        return self.__fecha

    def obtener_cliente(self) -> Cliente:
        return self.__cliente

    def obtener_neto(self) -> float:
        return self.__neto

    def obtener_monto_iva(self) -> float:
        return self.__monto_iva

    def obtener_no_gravado(self) -> float:
        return self.__no_gravado

    def obtener_total(self) -> float:
        return self.__total

    def obtener_envio(self) -> Envio:
        return self.__envio

    def obtener_carrito(self) -> Carrito:
        return self.__carrito

    # Consultar sobre este método
    def vender(self) -> Carrito:
        return self.__carrito
