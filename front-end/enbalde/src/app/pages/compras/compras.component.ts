import { Component, Input } from '@angular/core';
import { Compra, CompraClass } from './modelo/modelo.compra';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  @Input() compras: Compra [] = [
    new CompraClass(new Date("01/30/2022").getTime(), [ "1 x Helado" ], 1000)
  ];
}
