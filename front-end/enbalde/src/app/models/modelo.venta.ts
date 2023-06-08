import { Seleccion } from "./modelo.seleccion";

export interface Venta {
  cliente: string;
  fecha: Date,
  selecciones: Seleccion[];
  total: number;
}

export class VentaClass implements Venta {
  constructor(cliente: string, fecha: Date, selecciones: Seleccion[], total: number) {
    this.cliente = cliente;
    this.fecha = fecha;
    this.selecciones = selecciones;
    this.total = total;
  }

  cliente: string;
  fecha: Date;
  selecciones: Seleccion[];
  total: number;
}
