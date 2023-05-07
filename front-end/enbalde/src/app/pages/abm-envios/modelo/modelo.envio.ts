export interface Envio {
  id: number;
  nombre: string;
  costo: number;
}

export class EnvioClass implements Envio {
  constructor(id: number, nombre: string, costo: number) {
    this.id = id;
    this.nombre = nombre;
    this.costo = costo;
  }

  id: number;
  nombre: string;
  costo: number;
}
