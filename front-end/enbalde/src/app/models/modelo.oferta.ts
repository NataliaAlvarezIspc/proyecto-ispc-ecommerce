export interface Oferta {
  id: number;
  nombre: string;
  descuento: number;
}

export class OfertaClass implements Oferta {
  constructor(id: number, nombre: string, descuento: number) {
    this.id = id;
    this.nombre = nombre;
    this.descuento = descuento;
  }

  id: number;
  nombre: string;
  descuento: number;

  static Nulo: Oferta = new OfertaClass(-1, "Oferta Nula", 0);
}
