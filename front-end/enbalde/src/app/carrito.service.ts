import { Injectable } from '@angular/core';
import { ProductoClass } from './pages/producto/modelo/modelo.producto';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() { }

  obtenerProductosCarrito() {
    return [
      new ProductoClass(1, "Tentate Chocolate", "Helado sabor chocolate artesanal", 1100, 7, "/assets/img/chocolate.jpg"),
      new ProductoClass(2, "Tentate Frutilla", "Helado sabor frutilla artesanal", 1100, 8, "/assets/img/chocolate.jpg")
    ];
  }
}
