import { Seleccion } from "./modelo.seleccion";

export interface Compra {
    fecha: Date;
    selecciones: Seleccion[]
    total: number;
  }
