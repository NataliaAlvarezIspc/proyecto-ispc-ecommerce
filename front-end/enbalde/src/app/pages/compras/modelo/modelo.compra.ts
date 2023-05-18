import { Seleccion } from "../../carrito/modelo/modelo.seleccion";

export interface Compra {
    fecha: number;
    selecciones: Seleccion[]
    total: number;
  }

  export class CompraClass implements Compra {
    constructor(fecha: number, selecciones: Seleccion[], total: number) {
      this.fecha = fecha;
      this.selecciones = selecciones;
      this.total = total;
    }

    fecha: number;
    selecciones: Seleccion[];
    total: number;
  }
