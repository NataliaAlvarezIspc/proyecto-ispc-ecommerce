import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Usuario } from '../models/modelo.usuario';
import { ResultadoApi } from '../models/modelo.resultado';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = environment.API_URL;
  private loginUrl: string = `${this.API_URL}/auth/login/`;
  private logoutUrl: string = `${this.API_URL}/auth/logout/`;
  private tokenUrl: string = `${this.API_URL}/auth/token/`;

  private autenticado$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public autenticado = this.autenticado$.asObservable();
  public usuario?: Usuario;

  constructor(private http: HttpClient) {
  }

  autenticadoComo(usuarioActual: Usuario) {
    this.usuario = usuarioActual;
    this.autenticado$.next(true);
  }

  login(usuario: string, clave: string): Observable<ResultadoApi> {
    const formData = new FormData();
    formData.append("usuario", usuario);
    formData.append("clave", clave);

    return this.http.post<ResultadoApi>(this.loginUrl, formData)
      .pipe(catchError(error => {
        const resultado: ResultadoApi = {
          mensaje: error.error.mensaje,
          data: error.error.data,
          status: error.error.status
        };

        return throwError(() => resultado);
      }));
  }

  logout(): Observable<ResultadoApi> {
    return this.http.post<ResultadoApi>(this.logoutUrl, {})
      .pipe(catchError(error => {
        const resultado: ResultadoApi = {
          mensaje: error.error.mensaje,
          data: error.error.data,
          status: error.error.status
        };

        return throwError(() => resultado);
      }));
  }


}
