import { Injectable } from '@angular/core';
import { Producto } from './pages/producto/modelo/modelo.producto';
import { TipoProducto } from './pages/producto/modelo/modelo.tipoProducto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  private productosUrl: string = 'assets/productos.json';
  private tiposProductosUrl: string = 'assets/tipoProductos.json';

  constructor(private http: HttpClient) {
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

  obtenerTipos(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(this.tiposProductosUrl);
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
