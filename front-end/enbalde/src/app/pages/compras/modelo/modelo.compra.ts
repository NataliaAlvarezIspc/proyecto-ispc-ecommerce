export interface Compra {
    fecha: number;
    articulo: string[];
    total: number;
    obtenerArticulos(): string;
  }

  export class CompraClass implements Compra {
    constructor(fecha: number, articulo: string[], total: number) {
      this.fecha = fecha;
      this.articulo = articulo;
      this.total = total;
    }

    fecha: number;
    articulo: string[];
    total: number;

    obtenerArticulos = () => this.articulo.join(", ");
  }
