import { Component, Input } from '@angular/core';
import { Seleccion } from 'src/app/models/modelo.seleccion';
import { TipoPago, Venta } from 'src/app/models/modelo.venta';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-item-venta',
  templateUrl: './item-venta.component.html',
  styleUrls: ['./item-venta.component.css'],
  providers: [FuncionesService]
})

export class ItemVentaComponent {
  @Input() venta?: Venta;
  tipoPagos = [
    { id: TipoPago.EFECTIVO_A_PAGAR, texto: "Efectivo a pagar" },
    { id: TipoPago.EFECTIVO_PAGADO, texto: "Efectivo cobrado" },
    { id: TipoPago.ENBALDE_PAGO, texto: "EnbaldePago" }
  ];

  constructor(public funcionesService: FuncionesService) {
    this.venta = undefined;
  }

  obtenerArticulosVendidos(selecciones: Seleccion[]): string {
    return this.funcionesService.visualizarArticulos(selecciones);
  }

  visualizarFecha(fecha: Date): string {
    return this.funcionesService.visualizarFecha(fecha);
  }

  obtenerTipoPago = (tipoPago: TipoPago) => this.tipoPagos.filter(t => t.id == tipoPago)[0].texto;
}
