import { Injectable } from '@angular/core';
import { Producto, ProductoClass } from './pages/producto/modelo/modelo.producto';
import { TipoProducto, TipoProductoClass } from './pages/producto/modelo/modelo.tipoProducto';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  private productos : Producto[];
  private tipos: TipoProducto[];

  constructor() {
    this.productos = [
      new ProductoClass(1, "Tentate Chocolate", "Helado sabor chocolate artesanal", 1100, 7, "/assets/img/chocolate.jpg"),
      new ProductoClass(2, "Tentate Frutilla", "Helado sabor frutilla artesanal", 1100, 8, "/assets/img/chocolate.jpg"),
      new ProductoClass(3, "Tentate Dulce de Leche", "Helado sabor dulce de leche artesanal", 1100, 8, "/assets/img/chocolate.jpg"),
      new ProductoClass(4, "Tentate Choco-frutilla", "Helado sabor chocolate y frutilla artesanal", 1200, 7,"/assets/img/chocolate.jpg"),
      new ProductoClass(5, "Tentate frutilla-Americana", "Helado sabor frutilla y crema americana artesanal", 1200, 8, "/assets/img/chocolate.jpg"),
      new ProductoClass(6, "Tentate D.Leche-Argentino", "Helado  D.Leche-Argentino y chocolate artesanal", 1200, 4, "/assets/img/chocolate.jpg"),
      new ProductoClass(7, "Tentate Menta granizada", "Helado Menta granizada y chocolate artesanal", 1200, 4, "/assets/img/chocolate.jpg"),
      new ProductoClass(8, "Tentate Frutos del bosque", "Helado Frutos del bosque y frutillaartesanal", 1200, 4, "/assets/img/chocolate.jpg")
    ];

    this.tipos = [
      new TipoProductoClass(1, "Balde"),
      new TipoProductoClass(2, "Bombón"),
      new TipoProductoClass(3, "Alfajor")
    ];
  }

  obtenerProductos(): Producto[] {
    return this.productos;
  }

  obtenerTipos(): TipoProducto[] {
    return this.tipos;
  }
}
