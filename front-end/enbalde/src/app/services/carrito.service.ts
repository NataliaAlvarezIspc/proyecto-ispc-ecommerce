import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seleccion } from '../models/modelo.seleccion';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  private carritoUrl: string = 'assets/carrito.json';

  constructor(private http: HttpClient) { }

  obtenerProductosCarrito(): Observable<Seleccion[]> {
    return this.http.get<Seleccion[]>(this.carritoUrl);
  }
}
