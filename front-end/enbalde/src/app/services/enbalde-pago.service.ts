import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Envio } from '../models/modelo.envio';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { AutorizacionEnbaldePago } from '../models/modelo.autorizacionenbaldepago';
import { Seleccion } from '../models/modelo.seleccion';

@Injectable({
  providedIn: 'root'
})

export class EnbaldePagoService {
  private API_URL = environment.ENBALDEPAGO_API_URL;
  private autorizacionUrl: string = `${this.API_URL}/autorizacion/`;
  private pagoUrl: string = `${this.API_URL}/pago/`;

  constructor(private http: HttpClient) {
  }

  autorizar(carrito: Seleccion[], envio: Envio): Observable<any> {
    let total = carrito.reduce((t, s) => t + s.total, 0) + envio.monto;
    let descripcion = carrito.map(s => `${s.articulo.nombre} x ($ ${s.articulo.precio} x ${s.cantidad}) - $ ${s.descuento} = $ ${s.total}`).join('\n');
    descripcion += `\nEnvío: ${envio.nombre} ($ ${envio.monto})\nTotal: $ ${total}`;

    return this.http.post(this.autorizacionUrl, { descripcion, total });
  }

  pagar(respuesta: string, ticket: string) {
    return this.http.post<AutorizacionEnbaldePago>(this.pagoUrl, { respuesta, ticket });
  }
}
