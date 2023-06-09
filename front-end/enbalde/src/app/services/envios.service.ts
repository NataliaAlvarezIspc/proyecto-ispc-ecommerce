import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Envio } from '../models/modelo.envio';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})

export class EnviosService {
  private API_URL = environment.API_URL;
  private enviosUrl: string = `${this.API_URL}/envios/`;

  constructor(private http: HttpClient) {
  }

  obtenerEnvios() : Observable<Envio[]> {
    return this.http.get<Envio[]>(this.enviosUrl);
  }

  crear(nombre: string, monto: number): Observable<Envio> {
    return this.http.post<Envio>(this.enviosUrl, { nombre, monto });
  }

  borrar(envio: Envio): Observable<any> {
    return this.http.delete(`${this.enviosUrl}${envio.id}/`);
  }

  modificar(envio: Envio, nombre: string, monto: number): Observable<Envio> {
    return this.http.put<Envio>(`${this.enviosUrl}${envio.id}/`, { nombre, monto })
  }
}
