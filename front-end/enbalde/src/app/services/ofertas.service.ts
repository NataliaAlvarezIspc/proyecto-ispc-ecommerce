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

  crear(nombre: string, descuento: number, fechaVencimiento: Date): Observable<Oferta> {
    //console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    //var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    //var localISOTime = (new Date(new Date(fechaVencimiento).getTime() - tzoffset)).toISOString().slice(0, -1);
    let localISOTime = this.funcionesService.crearFechaLocal(fechaVencimiento);
    return this.http.post<Oferta>(this.ofertasUrl, { nombre, descuento, 'fechaVencimiento': localISOTime });
  }

  modificar(oferta: Oferta, nuevoNombre: string, nuevoDescuento: number, nuevaFechaVencimiento: Date): Observable<Oferta> {
    const formData = new FormData();
    formData.append('nombre', nuevoNombre);
    formData.append('descuento', nuevoDescuento.toString());
    formData.append('fechaVencimiento', nuevaFechaVencimiento.toString());

    return this.http.put<Oferta>(`${this.ofertasUrl}${oferta.id}/`, formData);
  }
}
