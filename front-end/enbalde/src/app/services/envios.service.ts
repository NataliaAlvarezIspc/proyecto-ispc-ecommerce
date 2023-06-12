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

  crear(nombre: string, precio: number): boolean {
    return true;
  }

  borrar(envio: Envio): boolean {
    return true;
  }

  modificar(envio: Envio, nombre: string, costo: number): boolean {
    return true;
  }
}
