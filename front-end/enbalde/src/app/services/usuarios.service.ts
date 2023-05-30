import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TipoUsuario, Usuario } from '../models/modelo.usuario';
import { ResultadoApi } from '../models/modelo.resultado';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  private API_URL = environment.API_URL;
  private registracionUrl: string = `${this.API_URL}/auth/signup/`;
  private loginUrl: string = `${this.API_URL}/auth/login/`;
  private tokenUrl: string = `${this.API_URL}/auth/token/`;
  private usuariosUrl: string = "/assets/usuarios.json";

  constructor(private http: HttpClient) {
  }

  registrar(nombre: string, apellido: string, email: string, direccion: string, usuario: string, clave: string, telefono: string, tipo: TipoUsuario): Observable<ResultadoApi> {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('email', email);
    formData.append('direccion', direccion);
    formData.append('usuario', usuario);
    formData.append('clave', clave);
    formData.append('telefono', telefono);
    formData.append('tipo', tipo.toString())

    return this.http.post<ResultadoApi>(this.registracionUrl, formData)
      .pipe(catchError(error => {
        const resultado: ResultadoApi = {
          mensaje: error.error.mensaje,
          data: error.error.data,
          status: error.error.status
        };

        return throwError(() => resultado);
      }));
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

  obtenerInformacionUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.usuariosUrl);
  }

  restablecerClave(email: string): boolean {
    return true
  }

  contacto(nombre: string, email: string, razon: string, mensaje: string): boolean {
    return true;
  }

  modificar(usuario: Usuario, nuevaDireccion: string, nuevoEmail: string, nuevaClave: string, nuevoTelefono: string, nuevasObservaciones: string) {
    return true;
  }
}

export interface RespuestaToken {
  acceso: string;
  refresco: string;
}

export interface TokenUsuario {
  accessToken: RespuestaToken;
  usuarioActual: Usuario;
}
