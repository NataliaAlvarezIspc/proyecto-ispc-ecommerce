import { Seleccion } from "../../carrito/modelo/modelo.seleccion";

export interface Venta {
  comprador: string;
  selecciones: Seleccion[];
  total: number;
}

export class VentaClass implements Venta {
  constructor(comprador: string, selecciones: Seleccion[], total: number) {
    this.comprador = comprador;
    this.selecciones = selecciones;
    this.total = total;
  }

  comprador: string;
  selecciones: Seleccion[];
  total: number;
}
