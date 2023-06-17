import { Component, Input } from '@angular/core';
import { Seleccion } from 'src/app/models/modelo.seleccion';
import { Venta } from 'src/app/models/modelo.venta';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-item-venta',
  templateUrl: './item-venta.component.html',
  styleUrls: ['./item-venta.component.css'],
  providers: [FuncionesService]
})

export class ItemVentaComponent {
  @Input() venta?: Venta;

  constructor(public funcionesService: FuncionesService) {
    this.venta = undefined;
  }

  obtenerArticulosVendidos(selecciones: Seleccion[]): string {
    return this.funcionesService.visualizarArticulos(selecciones);
  }

  visualizarFecha(fecha: Date): string {
    return this.funcionesService.visualizarFecha(fecha);
  }
}
