export interface Producto {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    cantidadDisponible: number;
    imagen: string[];
}

export class ProductoClass implements Producto {
  constructor(id: number, titulo: string, descripcion: string, precio: number, cantidadDisponible: number, imagen: string) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidadDisponible = cantidadDisponible;
    this.imagen = [ imagen ];
  }

  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  cantidadDisponible: number;
  imagen: string[];
}
