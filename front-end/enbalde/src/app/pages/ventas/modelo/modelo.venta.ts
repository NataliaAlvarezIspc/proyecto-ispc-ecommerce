import { Seleccion } from "../../carrito/modelo/modelo.seleccion";

export interface Venta {
  comprador: string;
  fecha: Date,
  selecciones: Seleccion[];
  total: number;
}

export class VentaClass implements Venta {
  constructor(comprador: string, fecha: Date, selecciones: Seleccion[], total: number) {
    this.comprador = comprador;
    this.fecha = fecha;
    this.selecciones = selecciones;
    this.total = total;
  }

  comprador: string;
  fecha: Date;
  selecciones: Seleccion[];
  total: number;
}
