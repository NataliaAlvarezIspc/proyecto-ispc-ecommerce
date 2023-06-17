import { Seleccion } from "./modelo.seleccion";

export enum TipoPago {
  EFECTIVO_A_PAGAR = 1,
  EFECTIVO_PAGADO = 2,
  ENBALDE_PAGO = 3
}

export interface Venta {
  id: number;
  cliente: string;
  fecha: Date,
  selecciones: Seleccion[];
  total: number;
  envio: string;
  pago: TipoPago;
  transaccion: string;
}
