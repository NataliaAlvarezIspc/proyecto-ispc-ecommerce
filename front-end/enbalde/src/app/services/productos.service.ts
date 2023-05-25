import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Producto } from '../models/modelo.producto';
import { TipoProducto } from '../models/modelo.tipoProducto';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  private productosUrl: string = 'http://localhost:8000/articulos';
  private tiposProductosUrl: string = 'http://localhost:8000/tipo_articulos';

  constructor(private http: HttpClient) {
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl);
  }

  borrarProducto(producto: Producto): boolean {
    return true;
  }

  crearProducto(nombre: string, descripcion: string, tipo: number, precio: number, cantidad: number, costo: number, imagen: string): boolean {
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

  buscar(term: string): Observable<any[]> {
    return this.http.get<any[]>(this.productosUrl).pipe(
      map((data) => data.filter(item =>
        item.titulo.toLowerCase().includes(term.toLowerCase())
      ))
    );
  }
}
