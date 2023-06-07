import { Producto } from "./modelo.producto";

export interface Seleccion {
  articulo: Producto;
  cantidad: number;
}

export class SeleccionClass implements Seleccion {
  articulo: Producto;
  cantidad: number;

  constructor(articulo: Producto, cantidad: number) {
    this.articulo = articulo;
    this.cantidad = cantidad;
  }
}
