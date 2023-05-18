import { Injectable } from '@angular/core';
import { Producto } from './pages/producto/modelo/modelo.producto';
import { TipoProducto, TipoProductoClass } from './pages/producto/modelo/modelo.tipoProducto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  private productosUrl = 'assets/productos.json';
  private tipos: TipoProducto[];

  constructor(private http: HttpClient) {
    this.tipos = [
      new TipoProductoClass(1, "Balde"),
      new TipoProductoClass(2, "Bombón"),
      new TipoProductoClass(3, "Alfajor")
    ];
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl);
  }

  borrarProducto(producto: Producto): boolean {
    return true;
  }

  crearProducto(nombre: string, descripcion: string, tipo: number, precio: number, cantidad: number, costo: number, alicuota: number, imagen: string): boolean {
    return true;
  }

  modificarProducto(producto: Producto, nuevoNombre: string, nuevaDescripcion: string, nuevoPrecio: number, nuevaCantidad: number, nuevaImagen: string): boolean {
    return true;
  }

  obtenerTipos(): TipoProducto[] {
    return this.tipos;
  }

  borrarTipo(tipoProducto: TipoProducto): boolean {
    return true;
  }

  crearTipo(nombre: string): boolean {
    return true;
  }

  modificarTipo(tipoProducto: TipoProducto, nuevoNombre: string) {
    return true;
  }
}
