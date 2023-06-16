import { Component, Input } from '@angular/core';
import { Venta } from '../../models/modelo.venta';
import { VentasService } from 'src/app/services/ventas.service';
import { Seleccion } from 'src/app/models/modelo.seleccion';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [VentasService, FuncionesService]
})

export class VentasComponent {
  @Input() ventas: Venta [] = [];

  constructor(private ventasService: VentasService, private funcionesService: FuncionesService) {
  }

  ngOnInit() : void {
    this.ventasService.obtenerVentas()
      .subscribe((ventas: Venta[]) => {
        this.ventas = ventas;
      });
  }

  obtenerArticulosVendidos(selecciones: Seleccion[]): string {
    return this.funcionesService.visualizarArticulos(selecciones);
  }

  visualizarFecha(fecha: Date): string {
    return this.funcionesService.visualizarFecha(fecha);
  }
}
