class Articulo:
    def __init__(self, id: int, descripcion: str, tipo: int, precio: float, costo: float, alicuota: float, imagen: str):
        self.__id = id
        self.__descripcion = descripcion
        self.__tipo = tipo
        self.__precio = precio
        self.__costo = costo
        self.__alicuota = alicuota
        self.__imagen = imagen

    def obtener_id(self) -> int:
        return self.__id

    def obtener_descripcion(self) -> str:
        return self.__descripcion

    def obtener_tipo(self) -> int:
        return self.__tipo

    def obtener_precio(self) -> float:
        return self.__precio

    def obtener_costo(self) -> float:
        return self.__costo

    def obtener_alicuota(self) -> float:
        return self.__alicuota

    def obtener_imagen(self) -> str:
        return self.__imagen
