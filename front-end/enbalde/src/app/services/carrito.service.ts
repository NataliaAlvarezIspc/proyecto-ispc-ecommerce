import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { Seleccion } from '../models/modelo.seleccion';
import { Producto } from '../models/modelo.producto';
import { AuthService } from './auth.service';
import { environment } from 'src/environment/environment';
import { TipoPago, Venta } from '../models/modelo.venta';
import { VentasService } from './ventas.service';
import { Envio } from '../models/modelo.envio';
import { Router } from '@angular/router';
import { EnbaldePagoService } from './enbalde-pago.service';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  private API_URL = environment.API_URL;
  private carritoUrl: string = `${this.API_URL}/carritos/`;

  constructor(private http: HttpClient, private authService: AuthService, private ventasService: VentasService, private router: Router, private enbaldePagoService: EnbaldePagoService) {
  }

  obtenerProductosCarrito(): Observable<Seleccion[]> {
    let carrito = this.authService.obtenerCarritoActual();
    return this.http.get<Seleccion[]>(`${this.carritoUrl}${carrito}`);
  }

  agregarProductoAlCarrito(producto: Producto): Observable<boolean> {
    let carrito = this.authService.obtenerCarritoActual();
    console.log("agregando al carrito " + carrito)
    return this.http.put<boolean>(`${this.carritoUrl}${carrito}`, { articulo: producto.id, cantidad: 1 })
  }

  quitarProductoAlCarrito(producto: Producto): Observable<any> {
    let carrito = this.authService.obtenerCarritoActual();
    return this.http.put(`${this.carritoUrl}${carrito}`, { articulo: producto.id, cantidad: -1 })
  }

  checkout(envio: Envio, tipoPago: TipoPago, transaccion: string = ""): Observable<Venta> {
    return this.ventasService.anotarVenta(envio, tipoPago, transaccion);
  }

  checkoutEnEnbalde(carrito: Seleccion[], envio: Envio): Observable<string> {
    return this.enbaldePagoService.autorizar(carrito, envio);
  }
        /*
          .pipe(switchMap((x: AutorizacionPago) => {
            if (x.status) {
              return this.ventasService.anotarVenta(envio, pagoElegido, x.transaccion);
            }

            return of(x.mensaje);
          }));*/

  entregarCarrito(): Observable<number> {
    let cliente = this.authService.obtenerUsuarioSiNoExpiro();
    if (cliente) {
      return this.http.post<number>(this.carritoUrl, { "usuario": cliente.usuario });
    }

    return of(0);
  }
}
