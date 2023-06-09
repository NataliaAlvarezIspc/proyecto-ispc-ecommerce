import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoPago, Venta } from '../models/modelo.venta';
import { environment } from 'src/environment/environment';
import { AuthService } from './auth.service';
import { Envio } from '../models/modelo.envio';

@Injectable({
  providedIn: 'root'
})

export class VentasService {
  private API_URL = environment.API_URL;
  private ventasUrl: string = `${this.API_URL}/ventas/`;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  anotar(envio: Envio, tipoPago: TipoPago, transaccion: string = ""): Observable<Venta> {
    let carrito = this.authService.obtenerCarritoActual();
    return this.http.post<Venta>(this.ventasUrl, {'carrito': carrito, 'envio': envio.id, 'pago': tipoPago, 'transaccion': transaccion});
  }

  obtener(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.ventasUrl);
  }

  borrar(venta: Venta) {
    return this.http.delete(`${this.ventasUrl}${venta.id}/`);
  }

  modificar(venta: Venta, tipoPago: TipoPago): Observable<Venta> {
    return this.http.patch<Venta>(`${this.ventasUrl}${venta.id}/`, { pago: tipoPago });
  }

}
