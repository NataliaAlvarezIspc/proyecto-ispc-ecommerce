import { Component, Input } from '@angular/core';
import { Producto, ProductoClass } from '../producto/modelo/modelo.producto';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})

export class CatalogComponent {
  carrito: Producto[] = [];

  @Input() productos: Producto [] = [
    new ProductoClass(1, "Tentate Chocolate", "Helado sabor chocolate artesanal", 1100, 7, "/assets/img/chocolate.jpg"),
    new ProductoClass(2, "Tentate Frutilla", "Helado sabor frutilla artesanal", 1100, 8, "/assets/img/chocolate.jpg"),
    new ProductoClass(3, "Tentate Dulce de Leche", "Helado sabor dulce de leche artesanal", 1100, 8, "/assets/img/chocolate.jpg"),
    new ProductoClass(4, "Tentate Choco-frutilla", "Helado sabor chocolate y frutilla artesanal", 1200, 7,"/assets/img/chocolate.jpg"),
    new ProductoClass(5, "Tentate frutilla-Americana", "Helado sabor frutilla y crema americana artesanal", 1200, 8, "/assets/img/chocolate.jpg"),
    new ProductoClass(6, "Tentate D.Leche-Argentino", "Helado  D.Leche-Argentino y chocolate artesanal", 1200, 4, "/assets/img/chocolate.jpg"),
    new ProductoClass(7, "Tentate Menta granizada", "Helado Menta granizada y chocolate artesanal", 1200, 4, "/assets/img/chocolate.jpg"),
    new ProductoClass(8, "Tentate Frutos del bosque", "Helado Frutos del bosque y frutillaartesanal", 1200, 4, "/assets/img/chocolate.jpg")

  ];
//Acomodé los ID y agg las img, junto con la funcion de agregarAlCarrito();
  agregarAlCarrito(producto: Producto) {
    if (producto.cantidadDisponible > 0) {
      producto.cantidadDisponible--;
      this.carrito.push(producto);
      alert('Agregaste al carrito un helado de: ' + producto.titulo)
    }
    if(producto.cantidadDisponible === 0){
      alert('No hay mas helado disponible de: '+ producto.titulo)
    }
  }
}
