import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { TipoUsuario, Usuario } from '../models/modelo.usuario';
import { ResultadoApi } from '../models/modelo.resultado';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  private API_URL = environment.API_URL;
  private registracionUrl: string = `${this.API_URL}/auth/signup/`;
  private usuariosUrl: string = `${this.API_URL}/usuarios/`;
  private contactoUrl: string = `${this.API_URL}/contacto/`;
  private mailUrl: string = `${this.API_URL}/auth/password_reset/`;
  private resetUrl: string = `${this.API_URL}/auth/password_reset/confirm/`;

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
    formData.append('tipo', tipo.toString());
    formData.append('observaciones', "");

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

  obtenerInformacionUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.usuariosUrl);
  }


  restablecerClave(email: string): Observable<any> {
    return this.http.post<any>(this.mailUrl, { email });
  }

  cambiarClavePorReset(token: string, password: string) {
    return this.http.post<any>(this.resetUrl, { token, password });
  }

  contacto(name: string, email: string, reason: string, message: string): Observable<any> {
    const url = this.contactoUrl;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('reason', reason);
    formData.append('message', message);

    return this.http.post(url, formData);
  }

  modificar(usuario: Usuario, nuevaDireccion: string, nuevoEmail: string, nuevaClave: string, nuevoTelefono: string, nuevasObservaciones: string, nuevoNombre?: string, nuevoApellido?: string, nuevoUsuario?: string, nuevoTipoUsuario?: TipoUsuario): Observable<Usuario> {
    const formData = new FormData();
    formData.append('direccion', nuevaDireccion);
    formData.append('email', nuevoEmail);
    formData.append('telefono', nuevoTelefono);
    formData.append('observaciones', nuevasObservaciones);

    if (nuevaClave) formData.append('clave', nuevaClave);
    if (nuevoNombre) formData.append('nombre', nuevoNombre);
    if (nuevoApellido) formData.append('apellido', nuevoApellido);
    if (nuevoUsuario) formData.append('usuario', nuevoUsuario);
    if (nuevoTipoUsuario) formData.append('tipo', nuevoTipoUsuario.toString())

    const url = `${this.usuariosUrl}${usuario.id}/`;

    return this.http.patch<Usuario>(url, formData);
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuariosUrl)
      .pipe(map(usuarios => usuarios as Usuario[]));
  }

  borrar(usuario: Usuario): Observable<any> {
    return this.http.delete(`${this.usuariosUrl}${usuario.id}/`);
  }
}

export interface RespuestaToken {
  acceso: string;
  refresco: string;
}

export interface TokenUsuario {
  accessToken: RespuestaToken;
  usuarioActual: Usuario;
  carritoActual: number;
}
