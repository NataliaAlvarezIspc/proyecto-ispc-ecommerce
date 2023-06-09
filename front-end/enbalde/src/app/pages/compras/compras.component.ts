import { Component, Input } from '@angular/core';
import { Compra } from '../../models/modelo.compra';
import { ComprasService } from 'src/app/services/compras.service';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
  providers: [ ComprasService, FuncionesService ]
})

export class ComprasComponent {
  @Input() compras: Compra [] = [];

  constructor(private comprasService: ComprasService, private funcionesService: FuncionesService) {
  }

  ngOnInit() : void {
    this.comprasService.obtenerCompras()
      .subscribe((compras: Compra[]) => this.compras = compras);
  }

  obtenerFechaFormateada(compra: Compra): string {
    return this.funcionesService.visualizarFecha(compra.fecha);
  }

  obtenerArticulos = (compra: Compra) =>
    this.funcionesService.visualizarArticulos(compra.selecciones);
}
