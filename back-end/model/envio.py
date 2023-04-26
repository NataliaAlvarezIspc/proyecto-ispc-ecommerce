from abc import ABC, abstractmethod

class Envio(ABC):
    @abstractmethod
    def obtener_costo(self):
        pass

    @abstractmethod
    def obtener_descripcion(self):
        pass

class RetiroEnTienda(Envio):
    def obtener_costo(self):
        return 0

    def obtener_descripcion(self):
        return "Retiro en tienda"

class EnvioLocal(Envio):
    def obtener_costo(self):
        return 150

    def obtener_descripcion(self):
        return "Envío dentro de la ciudad"

class EnvioCiudadesCercanas(Envio):
    def obtener_costo(self):
        return 350

    def obtener_descripcion(self):
        return "Envío a ciudades cercanas"

class EnvioCiudadesAlejadas(Envio):
    def obtener_costo(self):
        return 1400

    def obtener_descripcion(self):
        return "Envío a ciudades alejadas"
