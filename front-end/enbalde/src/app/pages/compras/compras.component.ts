import { Component, Input } from '@angular/core';
import { Compra, CompraClass } from './modelo/modelo.compra';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  @Input() compras: Compra [] = []
}
