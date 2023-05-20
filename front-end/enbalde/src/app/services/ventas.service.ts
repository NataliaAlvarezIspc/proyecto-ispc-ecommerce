import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venta } from '../models/modelo.venta';

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
