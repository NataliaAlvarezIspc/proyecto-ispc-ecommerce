import { Component, Input } from '@angular/core';
import { Producto } from '../producto/modelo/modelo.producto';


@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogComponent {
  @Input() productos: Producto [] = [];
}
