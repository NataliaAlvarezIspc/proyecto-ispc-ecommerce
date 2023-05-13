import { Injectable } from '@angular/core';
import { ProductoClass } from './pages/producto/modelo/modelo.producto';
import { Seleccion, SeleccionClass } from './pages/carrito/modelo/modelo.seleccion';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  constructor() { }

  obtenerProductosCarrito(): Seleccion[] {
    return [
      new SeleccionClass(new ProductoClass(1, "Tentate Chocolate", "Helado sabor chocolate artesanal", 1100, 1, "/assets/img/chocolate.jpg"), 1),
      new SeleccionClass(new ProductoClass(2, "Tentate Frutilla", "Helado sabor frutilla artesanal", 1100, 1, "/assets/img/chocolate.jpg"), 1)
    ];
  }
}
