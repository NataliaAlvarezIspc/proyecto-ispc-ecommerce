import { Seleccion } from "./modelo.seleccion";
import { TipoPago } from "./modelo.venta";

export interface Compra {
    fecha: Date;
    selecciones: Seleccion[]
    total: number;
    pago: TipoPago;
  }
