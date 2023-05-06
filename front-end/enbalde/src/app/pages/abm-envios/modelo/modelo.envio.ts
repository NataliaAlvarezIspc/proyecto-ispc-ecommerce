export interface Envio {
  id: number;
  nombre: string;
}

export class EnvioClass implements Envio {
  constructor(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
  }

  id: number;
  nombre: string;
}
