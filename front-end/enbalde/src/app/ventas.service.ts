import { Injectable } from '@angular/core';
import { Venta } from './pages/ventas/modelo/modelo.venta';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class VentasService {
  private ventasUrl: string = "assets/ventas.json";

  constructor(private http: HttpClient) { }

  obtenerVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.ventasUrl);
  }
}
