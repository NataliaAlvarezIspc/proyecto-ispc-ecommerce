import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Envio } from '../models/modelo.envio';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AutorizacionEnbaldePago } from '../models/modelo.autorizacionenbaldepago';
import { Seleccion } from '../models/modelo.seleccion';
import { TipoPago } from '../models/modelo.venta';
import { AutorizacionPago } from '../models/modelo.autorizacionpago';

@Injectable({
  providedIn: 'root'
})

export class EnbaldePagoService {
  private API_URL = environment.ENBALDEPAGO_API_URL;
  private pagoUrl: string = `${this.API_URL}/pago/`;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  autorizar(carrito: Seleccion[], envio: Envio): Observable<AutorizacionPago> {
    let total = carrito.reduce((t, s) => t + s.total, 0) + envio.monto;
    let descripcion = carrito.map(s => `${s.articulo.nombre} x ($ ${s.articulo.precio} - $ ${s.descuento}) x ${s.cantidad} = $ ${s.total}`).join('\n');
    descripcion += `\nEnvío: ${envio.nombre} ($ ${envio.monto})`;

    return this.http.post<AutorizacionEnbaldePago>(this.pagoUrl, { descripcion, total })
      .pipe(
        map((res: AutorizacionEnbaldePago) =>
          ({ tipo: TipoPago.ENBALDE_PAGO, transaccion: res.transaccion, status: res.status, mensaje: res.mensaje }))
      );
  }
}

