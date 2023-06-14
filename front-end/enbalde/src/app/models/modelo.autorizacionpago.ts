import { TipoPago } from "./modelo.venta";

export interface AutorizacionPago {
  tipo: TipoPago;
  transaccion: string,
  status: boolean;
  mensaje: string;
}
