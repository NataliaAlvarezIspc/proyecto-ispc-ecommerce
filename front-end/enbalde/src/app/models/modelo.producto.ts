import { TipoProducto } from "./modelo.tipoProducto";

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagen: string[];
  tipo: TipoProducto;
}

export class ProductoClass implements Producto {
  constructor(id: number, titulo: string, descripcion: string, precio: number, cantidadDisponible: number, imagen: string, tipoProducto: TipoProducto) {
    this.id = id;
    this.nombre = titulo;
    this.descripcion = descripcion;
    this.precio = precio;
    this.cantidad = cantidadDisponible;
    this.imagen = [ imagen ];
    this.tipo = tipoProducto;
  }

  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagen: string[];
  tipo: TipoProducto;
}
