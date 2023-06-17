import { Component, Input } from '@angular/core';
import { Venta } from '../../models/modelo.venta';
import { VentasService } from 'src/app/services/ventas.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { ResultadoApi } from 'src/app/models/modelo.resultado';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [VentasService, FuncionesService]
})

export class VentasComponent {
  @Input() ventas: Venta [] = [];
  @Input() resultado?: ResultadoApi;

  constructor(private ventasService: VentasService, private funcionesService: FuncionesService) {
  }

  ngOnInit() : void {
    this.ventasService.obtener()
      .subscribe((ventas: Venta[]) => {
        this.ventas = ventas;
      });
  }

  refrescar(resultado?: ResultadoApi) {
    this.resultado = resultado;
    let ventaPagada = resultado?.data as Venta;

    let ventaSinPagar = this.ventas.find(v => v.id == ventaPagada.id);
    if (ventaSinPagar) {
      Object.assign(ventaSinPagar, ventaPagada);
    }
    else {
      this.ventasService.obtener()
        .subscribe((ventas: Venta[]) => this.ventas = ventas);
    }
  }
}
