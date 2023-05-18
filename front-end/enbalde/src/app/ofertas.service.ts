import { Injectable } from '@angular/core';
import { Oferta } from './pages/ofertas/modelo/modelo.oferta';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OfertasService {
  private ofertasUrl: string = "assets/ofertas.json";

  constructor(private http: HttpClient) {
  }

  obtenerOfertas(): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(this.ofertasUrl);
  }

  borrar(oferta: Oferta): boolean {
    return true;
  }

  crear(nombre: string, descuento: number): boolean {
    return true;
  }

  modificar(oferta: Oferta, nuevoNombre: string, nuevoDescuento: number): boolean {
    return true;
  }
}
