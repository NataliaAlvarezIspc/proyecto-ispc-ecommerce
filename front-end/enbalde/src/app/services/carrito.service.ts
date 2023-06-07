import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seleccion } from '../models/modelo.seleccion';
import { Producto } from '../models/modelo.producto';
import { AuthService } from './auth.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  private API_URL = environment.API_URL;
  private carritoUrl: string = `${this.API_URL}/carritos/`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  obtenerProductosCarrito(): Observable<Seleccion[]> {
    let carrito = this.authService.obtenerCarritoActual();
    return this.http.get<Seleccion[]>(`${this.carritoUrl}${carrito}`);
  }

  agregarProductoAlCarrito(producto: Producto): Observable<boolean> {
    let carrito = this.authService.obtenerCarritoActual();
    return this.http.put<boolean>(`${this.carritoUrl}${carrito}`, { articulo: producto.id, cantidad: 1 })
  }

  quitarProductoAlCarrito(producto: Producto): Observable<boolean> {
    let carrito = this.authService.obtenerCarritoActual();
    return this.http.put<boolean>(`${this.carritoUrl}${carrito}`, { articulo: producto.id, cantidad: -1 })
  }
}
