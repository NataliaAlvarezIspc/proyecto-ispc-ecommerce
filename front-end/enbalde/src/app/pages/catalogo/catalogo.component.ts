import { Component, Input } from '@angular/core';
import { Producto, ProductoClass } from '../producto/modelo/modelo.producto';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogComponent {
  @Input() productos: Producto [] = [
    new ProductoClass(1, "Tentatenbalde Chocolate", "Helado sabor chocolate artesanal", 1100, "/src/assets/img/chocolate.jpg"),
    new ProductoClass(2, "Tentatenbalde Frutilla", "Helado sabor frutilla artesanal", 1100, "/src/assets/img/chocolate.jpg"),
    new ProductoClass(3, "Tentatenbalde Dulce de Leche", "Helado sabor dulce de leche artesanal", 1100, "/src/assets/img/chocolate.jpg"),
    new ProductoClass(4, "Tentatenbalde Choco-frutilla", "Helado sabor chocolate y frutilla artesanal", 1200, "/src/assets/img/choco-frutilla.jpg"),
    new ProductoClass(4, "Tentatenbalde frutilla-Americana", "Helado sabor frutilla y crema americana artesanal", 1200, "/src/assets/img/choco-frutilla.jpg"),
    new ProductoClass(4, "Tentatenbalde D.Leche-Chocolate", "Helado sabor dulce de leche y chocolate artesanal", 1200, "/src/assets/img/choco-frutilla.jpg")
  ];
}
