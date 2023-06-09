import { Seleccion } from "./modelo.seleccion";

export interface Venta {
  cliente: string;
  fecha: Date,
  selecciones: Seleccion[];
  total: number;
}
