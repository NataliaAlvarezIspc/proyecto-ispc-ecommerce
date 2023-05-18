import { Component, Input } from '@angular/core';
import { Compra, CompraClass } from './modelo/modelo.compra';
import { ComprasService } from 'src/app/compras.service';

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
    this.compras = this.comprasService.obtenerCompras();
  }
}
