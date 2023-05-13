import { Producto } from "../../producto/modelo/modelo.producto";

export interface Seleccion {
  producto: Producto;
  cantidad: number;
  obtener_total(): number;
}

export class SeleccionClass implements Seleccion {
  producto: Producto;
  cantidad: number;

  constructor(producto: Producto, cantidad: number) {
    this.producto = producto;
    this.cantidad = cantidad;
  }

  obtener_total = (): number => this.producto.precio * this.cantidad;
}
