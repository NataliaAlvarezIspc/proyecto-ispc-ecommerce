import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs';
import { Producto, ProductoNuevo } from '../models/modelo.producto';
import { TipoProducto } from '../models/modelo.tipoProducto';
import { ResultadoApi } from '../models/modelo.resultado';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  private productosUrl: string = 'http://localhost:8000/articulos/';
  private tiposProductosUrl: string = 'http://localhost:8000/tipo_articulos/';

  constructor(private http: HttpClient) {
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<ResultadoApi>(this.productosUrl)
      .pipe(map(response => response.data as Producto[]));
  }

  borrarProducto(producto: Producto): boolean {
    return true;
  }

  crearProducto(nombre: string, descripcion: string, precio: number, cantidad: number, costo: number, imagen: string, tipoProducto: TipoProducto): Observable<ResultadoApi> {
    let producto: ProductoNuevo = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      cantidad: cantidad,
      costo: costo,
      imagen: imagen,
      tipo: tipoProducto
    };

    return this.http.post<ResultadoApi>(this.productosUrl, producto)
      .pipe(catchError(error => {
        const resultado: ResultadoApi = {
          mensaje: error.error.mensaje,
          data: error.error.data,
          status: error.error.status
        };

        return throwError(() => resultado);
      }))
  }

  modificarProducto(producto: Producto, nuevoNombre: string, nuevaDescripcion: string, nuevoPrecio: number, nuevaCantidad: number, nuevaImagen: string): boolean {
    return true;
  }

  obtenerTipos(): Observable<TipoProducto[]> {
    return this.http.get<ResultadoApi>(this.tiposProductosUrl)
      .pipe(map(response => response.data as TipoProducto[]));
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
