from model.usuario import Usuario

class Cliente(Usuario):
    def __init__(self, id: int, nombre: str, apellido: str, dni: int, usuario: str, password: str, email: str):
        super().__init__(id, nombre, apellido, dni, usuario, password, email)
