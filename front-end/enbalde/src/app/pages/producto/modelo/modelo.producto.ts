export interface Producto {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    imagen: string[];
}

export class ProductoClass implements Producto {
  constructor(id: number, titulo: string, descripcion: string, precio: number, imagen: string) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen = [ imagen ];
  }
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagen: string[];
}
