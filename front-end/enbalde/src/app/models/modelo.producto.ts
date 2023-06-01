export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  costo: number;
  cantidad: number;
  imagen: string;
  tipo: number;
}

export class ProductoClass implements Producto {
  constructor(id: number, nombre: string, descripcion: string, precio: number, costo: number, cantidad: number, imagen: string, tipo: number) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.costo = costo;
    this.cantidad = cantidad;
    this.imagen = imagen;
    this.tipo = tipo;
  }

  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  costo: number;
  cantidad: number;
  imagen: string;
  tipo: number;

  static Nulo: Producto = new ProductoClass(-1, "", "", 0, 0, 0, "", 0);
}
