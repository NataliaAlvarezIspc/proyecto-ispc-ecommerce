import { Injectable } from '@angular/core';
import { Compra } from './pages/compras/modelo/modelo.compra';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ComprasService {
  private comprasUrl: string = 'assets/compras.json';

  constructor(private http: HttpClient) { }

  obtenerCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.comprasUrl);
  }
}
