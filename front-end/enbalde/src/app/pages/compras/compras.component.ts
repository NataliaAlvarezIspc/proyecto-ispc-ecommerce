import { Component, Input } from '@angular/core';
import { Compra } from '../../models/modelo.compra';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
  providers: [ ComprasService ]
})

export class ComprasComponent {
  @Input() compras: Compra [] = [];

  constructor(public comprasService: ComprasService) {
  }

  ngOnInit() : void {
    this.comprasService.obtenerCompras().subscribe((compras: Compra[]) => this.compras = compras);
  }

  obtenerFechaFormateada(compra: Compra): string {
    return compra.fecha.toLocaleString();
  }

  obtenerArticulos = (compra: Compra) => compra.selecciones.map(p => p.producto.titulo).join(", ");
}
