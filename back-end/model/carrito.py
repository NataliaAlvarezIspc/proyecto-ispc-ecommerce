from model.seleccion import Seleccion
import numpy as np

class Carrito:
    #Consultar la dimension del arreglo
    #selecciones.resize(3)
    def __init__(self):
        self.selecciones = np.empty(0, dtype=Seleccion)
    
    def agregar(self, seleccion):
        self.selecciones = np.append(self.selecciones, seleccion)
    
    def eliminar(self, seleccion):
        self.selecciones = np.delete(self.selecciones, np.where(self.selecciones == seleccion))
    
    def modificar(self, seleccion, nombre=None, ranking=None):
        index = np.where(self.selecciones == seleccion)[0]
        if len(index) == 1:
            if nombre is not None:
                self.selecciones[index[0]].nombre = nombre
            if ranking is not None:
                self.selecciones[index[0]].ranking = ranking
        else:
            raise ValueError("La selección no se encuentra en el arreglo.")
    
    def listar(self):
        for seleccion in self.selecciones:
            print(f"{seleccion.nombre} - Ranking: {seleccion.ranking}")

