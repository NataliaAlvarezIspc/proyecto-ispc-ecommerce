import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TipoUsuario, Usuario } from '../models/modelo.usuario';
import { ResultadoApi } from '../models/modelo.resultado';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  private usuariosUrl: string = 'http://localhost:8000/api/usuarios/';

  constructor(private http: HttpClient) {
  }

  registrar(nombre: string, apellido: string, email: string, direccion: string, usuario: string, clave: string, telefono: string, tipo: TipoUsuario): Observable<ResultadoApi> {
    const formData = new FormData();
    formData.append('first_name', nombre);
    formData.append('last_name', apellido);
    formData.append('email', email);
    formData.append('direccion', direccion);
    formData.append('username', usuario);
    formData.append('password', clave);
    formData.append('telefono', telefono);
    formData.append('tipo', tipo.toString())

    return this.http.post<ResultadoApi>(this.usuariosUrl, formData)
      .pipe(catchError(error => {
        const resultado: ResultadoApi = {
          mensaje: error.error.mensaje,
          data: error.error.data,
          status: error.error.status
        };

        return throwError(() => resultado);
      }));
  }

  login(usuario: string, clave: string): boolean {
    if (usuario == 'Natalia' && clave == '123456')
      return true
    else
      return false
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
