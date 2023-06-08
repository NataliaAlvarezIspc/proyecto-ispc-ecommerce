import { Component, Input } from '@angular/core';
import { Venta } from '../../models/modelo.venta';
import { VentasService } from 'src/app/services/ventas.service';
import { Seleccion } from 'src/app/models/modelo.seleccion';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [ VentasService ]
})

export class VentasComponent {
  @Input() ventas: Venta [] = [];

  constructor(public ventasService: VentasService) {
  }

  ngOnInit() : void {
    this.ventasService.obtenerVentas()
      .subscribe((ventas: Venta[]) => {
        this.ventas = ventas;
      });
  }

  obtenerArticulosVendidos(selecciones: Seleccion[]): string {
    return selecciones
      .map((seleccion) => `${seleccion.articulo.nombre} x ${seleccion.cantidad}`)
      .join(", ");
  }
}
