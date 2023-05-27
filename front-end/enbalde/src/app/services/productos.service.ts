import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { map } from 'rxjs';
import { Producto } from '../models/modelo.producto';
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

  crearProducto(nombre: string, descripcion: string, precio: number, cantidad: number, costo: number, imagen: File, tipoProducto: TipoProducto): Observable<ResultadoApi> {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    formData.append('precio', precio.toString());
    formData.append('cantidad', cantidad.toString());
    formData.append('costo', costo.toString());
    formData.append('imagen', imagen);
    formData.append('tipo', tipoProducto.id.toString());

    return this.http.post<ResultadoApi>(this.productosUrl, formData)
      .pipe(catchError(error => {
        const resultado: ResultadoApi = {
          mensaje: error.error.mensaje,
          data: error.error.data,
          status: error.error.status
        };

        return throwError(() => resultado);
      }));
  }

  modificarProducto(producto: Producto, nuevoNombre: string, nuevaDescripcion: string, nuevoPrecio: number, nuevaCantidad: number, nuevaImagen: string): boolean {
    return true;
  }

  obtenerTipos(): Observable<TipoProducto[]> {
    return this.http.get<ResultadoApi>(this.tiposProductosUrl)
      .pipe(map(response => response.data as TipoProducto[]));
  }

  borrarTipo(tipoProducto: TipoProducto): Observable<ResultadoApi> {
    let url = `${this.tiposProductosUrl}${tipoProducto.id}`;
    return this.http.delete<ResultadoApi>(url)
      .pipe(catchError(error => {
        const resultado: ResultadoApi = {
          mensaje: error.error.mensaje,
          data: error.error.data,
          status: error.error.status
        };

        return throwError(() => resultado);
      }));
  }

  crearTipo(nombre: string): Observable<ResultadoApi> {
    return this.http.post<ResultadoApi>(this.tiposProductosUrl, { "nombre": nombre })
      .pipe(catchError(error => {
        const resultado: ResultadoApi = {
          mensaje: error.error.mensaje,
          data: error.error.data,
          status: error.error.status
        };

        return throwError(() => resultado);
      }));
  }

  modificarTipo(tipoProducto: TipoProducto, nuevoNombre: string): Observable<ResultadoApi> {
    let url = `${this.tiposProductosUrl}${tipoProducto.id}`;
    return this.http.put<ResultadoApi>(url, { "nombre": nuevoNombre })
      .pipe(catchError(error => {
        const resultado: ResultadoApi = {
          mensaje: error.error.mensaje,
          data: error.error.data,
          status: error.error.status
        };

        return throwError(() => resultado);
      }));
  }

  buscar(term: string): Observable<any[]> {
    return this.http.get<any[]>(this.productosUrl).pipe(
      map((data) => data.filter(item =>
        item.titulo.toLowerCase().includes(term.toLowerCase())
      ))
    );
  }
}
