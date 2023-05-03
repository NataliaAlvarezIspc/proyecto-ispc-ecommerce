import { Component, Input } from '@angular/core';
import { Producto, ProductoClass } from '../producto/modelo/modelo.producto';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogComponent {
  @Input() productos: Producto [] = [
    new ProductoClass(1, "Helado", "Gran helado", 1100, "/assets/no_image_available.svg")
  ];
}
