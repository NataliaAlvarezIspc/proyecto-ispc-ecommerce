import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Oferta } from '../models/modelo.oferta';
import { environment } from 'src/environment/environment';
import { FuncionesService } from './funciones.service';

@Injectable({
  providedIn: 'root'
})

export class OfertasService {
  private API_URL = environment.API_URL;
  private ofertasUrl: string = `${this.API_URL}/ofertas/`;

  constructor(private http: HttpClient, private funcionesService: FuncionesService) {
  }

  obtenerOfertas(): Observable<Oferta[]> {
    return this.http.get<Oferta[]>(this.ofertasUrl);
  }

  borrar(oferta: Oferta): Observable<boolean> {
    return this.http.delete<boolean>(`${this.ofertasUrl}${oferta.id}/`);
  }

  crear(nombre: string, descuento: number, vencimiento: Date, articulos: Array<number>): Observable<Oferta> {
    let fechaVencimiento = this.funcionesService.crearFechaLocal(vencimiento);
    let data = { nombre, descuento, fechaVencimiento, articulos: articulos.map(id => ({ id })) };
    console.log(data);
    return this.http.post<Oferta>(this.ofertasUrl, data);
  }

  modificar(oferta: Oferta, nuevoNombre: string, nuevoDescuento: number, nuevaFechaVencimiento: Date): Observable<Oferta> {
    const formData = new FormData();
    formData.append('nombre', nuevoNombre);
    formData.append('descuento', nuevoDescuento.toString());
    formData.append('fechaVencimiento', nuevaFechaVencimiento.toString());

    return this.http.put<Oferta>(`${this.ofertasUrl}${oferta.id}/`, formData);
  }
}
