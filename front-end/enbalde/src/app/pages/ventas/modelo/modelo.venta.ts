export interface Venta {
  comprador: string;
  articulo: string[];
  total: number;
  obtenerArticulos(): string;
}

export class VentaClass implements Venta {
  constructor(comprador: string, articulo: string[], total: number) {
    this.comprador = comprador;
    this.articulo = articulo;
    this.total = total;
  }

  comprador: string;
  articulo: string[];
  total: number;

  obtenerArticulos = () => this.articulo.join(", ");
}
