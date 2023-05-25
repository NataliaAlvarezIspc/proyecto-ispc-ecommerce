import { Component, Input } from '@angular/core';
import { Producto } from '../../models/modelo.producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent {
  @Input() muestra: boolean = true;
  @Input() producto!: Producto;
}
