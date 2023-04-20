class Usuario:
    def __init__(self, id:int, nombre:str, apellido:str,dni:int,usuario:str, password:str,email:str):
        self.__id = id
        self.__nombre = nombre
        self.__apellido = apellido
        self.__dni = dni
        self.__usuario = usuario
        self.__password = password
        self.__email = email

# Consultar sobre metodo obtener_id(no figura en el diagrama)
    def obtener_usuario(self) -> str:
        return self.__usuario

    def obtener_nombre(self) -> str:
        return self.__nombre            

    def obtener_apellido(self) -> str:
        return self.__apellido

    def obtener_dni(self) -> int:
        return self.__dni

    def obtener_email(self) -> str:
        return self.__email

    def obtener_password(self) -> str:
        return self.__password    
