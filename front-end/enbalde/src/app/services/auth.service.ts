import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, catchError, delay, finalize, of, tap, throwError } from 'rxjs';
import { Usuario } from '../models/modelo.usuario';
import { ResultadoApi } from '../models/modelo.resultado';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { TokenUsuario } from './usuarios.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private API_URL = environment.API_URL;
  private loginUrl: string = `${this.API_URL}/auth/login/`;
  private logoutUrl: string = `${this.API_URL}/auth/logout/`;
  private tokenUrl: string = `${this.API_URL}/auth/token/`;

  private autenticado$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public autenticado: Observable<boolean> = this.autenticado$.asObservable();
  private usuario?: Usuario;
  private token: any;
  private suscripcionToken: Subscription = new Subscription()
  private timeout: any;

  constructor(private router: Router, private http: HttpClient, private jwtHelperService: JwtHelperService) {
    this.token = localStorage.getItem('accessToken');
    const usuarioActual = localStorage.getItem('usuarioActual');
    this.actualizarInformacionUsuario(this.token, usuarioActual);
  }

  actualizarInformacionUsuario(token: any, usuarioActual: any) {
    if ((token != null && token != undefined) && usuarioActual) {
      let date = this.jwtHelperService.getTokenExpirationDate(token);
      if (date) {
        this.token = token;
        this.timeout = date?.valueOf() - new Date().valueOf();
        let usuario = JSON.parse(usuarioActual) as Usuario;
        this.autenticadoComo(usuario);
        this.cuentaRegresivaExpiracion();
      }
      else {
        this.borrarToken();
      }
    }
    else {
      this.borrarToken();
    }
  }

  cuentaRegresivaExpiracion() {
    this.suscripcionToken.unsubscribe();
    this.suscripcionToken = of(null).pipe(delay(this.timeout))
      .subscribe((expired) => {
        this.borrarToken();
        this.router.navigate(["/login"]);
      });
  }

  autenticadoComo(usuarioActual: Usuario | undefined) {
    this.usuario = usuarioActual;
    this.autenticado$.next(usuarioActual != undefined);
  }

  obtenerUsuarioSiNoExpiro(): Usuario | undefined {
    if (this.tokenExpirada(this.token)) {
      this.borrarToken();
      return undefined;
    }

    return this.usuario;
  }

  borrarToken(): void {
    this.suscripcionToken.unsubscribe();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('usuarioActual');
    this.token = null;
    this.autenticadoComo(undefined);
  }

  private tokenExpirada(token: string | null) {
    if (token) {
      const expiracion = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiracion;
    }
    return true;
  }

  login(usuario: string, clave: string): Observable<ResultadoApi> {
    const formData = new FormData();
    formData.append("usuario", usuario);
    formData.append("clave", clave);

    return this.http.post<ResultadoApi>(this.loginUrl, formData)
      .pipe(tap((resultado: ResultadoApi) => {
        let tokenUsuario = resultado.data as TokenUsuario;
        let usuarioActual = JSON.stringify(tokenUsuario.usuarioActual);

        localStorage.setItem('accessToken', `${tokenUsuario.accessToken.acceso}`);
        localStorage.setItem('usuarioActual', usuarioActual);

        this.actualizarInformacionUsuario(tokenUsuario.accessToken.acceso, usuarioActual)
      }),
      catchError(error => {
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
      }))
      .pipe(finalize(() => {
        this.borrarToken();
      }));
  }
}
