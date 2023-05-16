export interface Compra {
    fecha: number;
    articulo: string[];
    total: number;
    obtenerArticulos(): string;
    obtenerFechaFormateada(): string;
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
    obtenerFechaFormateada(): string {
        const fechaObj = new Date(this.fecha);
        const dia = fechaObj.getDate();
        const mes = fechaObj.getMonth() + 1;
        const anio = fechaObj.getFullYear();
        return `${dia}/${mes}/${anio}`;
      }
  }
