import { Component, Input } from '@angular/core';
import { Producto, ProductoClass } from '../../producto/modelo/modelo.producto';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent  {

  total: number = 0
  carrito: Producto[] = [];

  @Input() productos: Producto [] = [
    new ProductoClass(1, "Helado Tentación Dark", "Sabor a crema chocolatozo", 1100, 3, "/assets/no_image_available.svg"),
    new ProductoClass(2, "Helado Tentación White", "Sabor a fresco granizado", 500, 3,  "/assets/no_image_available.svg"),
    new ProductoClass(3, "Helado Tentación Danger", "Sabor a crema frutilla", 300, 3,  "/assets/no_image_available.svg"),
    new ProductoClass(4, "Helado Tentación Angel", "Sabor a crema del cielo", 300, 3,  "/assets/no_image_available.svg")
  
  ];
  
  
// Elimino todos los productos una vez pagados y restauro el valor total
  pagar(){
    alert('Has pagado correctamente');
    this.total = 0;
    this.carrito = [];
  }

// Agrego un procuto al carrito
  agregarAlCarrito(producto: Producto) {
    if (producto.cantidadDisponible > 0) {
      producto.cantidadDisponible--;
      this.carrito.push(producto);
      this.total += producto.precio;
    }
    if(producto.cantidadDisponible === 0){
      alert('No hay mas helado disponible de: '+ producto.titulo)
    }
  }

}
