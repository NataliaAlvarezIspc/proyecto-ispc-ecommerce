export interface TipoProducto {
  id: number;
  nombre: string;
}

export class TipoProductoClass implements TipoProducto {
  constructor(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
  }

  id: number;
  nombre: string;

  static Nulo: TipoProducto = new TipoProductoClass(-1, "Tipo Nulo");
}
