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

export interface ProductoNuevo {
  nombre: string;
  descripcion: string;
  precio: number;
  costo: number;
  cantidad: number;
  imagen: string;
  tipo: TipoProducto;
}
