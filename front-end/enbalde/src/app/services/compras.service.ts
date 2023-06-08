import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Compra } from '../models/modelo.compra';
import { environment } from 'src/environment/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class ComprasService {
  private API_URL = environment.API_URL;
  private comprasUrl: string = `${this.API_URL}/ventas/`;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  obtenerCompras(): Observable<Compra[]> {
    let cliente = this.authService.obtenerUsuarioSiNoExpiro();
    if (cliente) {
      return this.http.get<Compra[]>(`${this.comprasUrl}${cliente}`);
    }

    return of([])
  }
}
