import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Seleccion } from '../models/modelo.seleccion';
import { TipoPago } from '../models/modelo.venta';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {
  constructor(@Inject(LOCALE_ID) private locale: string) { }

  crearId = (id: number) => `id-${id}`;

  extraerId = (id: string) => parseInt(id.split("-")[1]);

  visualizarFecha = (fecha: Date) => formatDate(fecha, 'yyyy-MM-dd HH:mm', this.locale);

  visualizarArticulos(selecciones: Seleccion[]): string {
    return selecciones
      .map((seleccion) => `${seleccion.articulo.nombre} x ${seleccion.cantidad}`)
      .join(", ");
  }

  crearFechaLocal = (fechaVencimiento: Date) =>
    new Date(fechaVencimiento).toISOString().replace('Z', '-03:00');

  visualizarTipoPago(pago: TipoPago) {
    switch (pago) {
      case TipoPago.EFECTIVO_A_PAGAR: return "Efectivo a pagar";
      case TipoPago.EFECTIVO_PAGADO: return "Efectivo pagado";
      case TipoPago.ENBALDE_PAGO: return "Enbalde Pago";
      default: return "Desconocido";
    }
  }
}
