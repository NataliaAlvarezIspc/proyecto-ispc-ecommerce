import { TipoProductoClass } from "./modelo.tipoProducto";
import { TipoProducto } from "./modelo.tipoProducto";

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  costo: number;
  cantidad: number;
  imagen: string;
  tipo: TipoProducto;
}

export class ProductoClass implements Producto {
  constructor(id: number, nombre: string, descripcion: string, precio: number, costo: number, cantidad: number, imagen: string, tipo: TipoProducto) {
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
  tipo: TipoProducto;

  static Nulo: Producto = new ProductoClass(-1, "", "", 0, 0, 0, "", TipoProductoClass.Nulo);
}
