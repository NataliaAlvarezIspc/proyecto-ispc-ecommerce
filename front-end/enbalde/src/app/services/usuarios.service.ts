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
  

  restablecerClave(email: string): boolean {
    return true
  }

  contacto(name: string, email: string, reason: string, message: string): any {
    const url = this.contactoUrl; 
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('reason', reason);
    formData.append('message', message);
   

    this.http.post(url, formData).subscribe(
      (response) => {
        console.log('Datos enviados correctamente');
      },
      (error) => {
        console.error('Error al enviar los datos:', error); 
        return false;
      }
    );
  }


  modificar(usuario: Usuario, nuevaDireccion: string, nuevoEmail: string, nuevaClave: string, nuevoTelefono: string, nuevasObservaciones: string): Observable<Usuario> {
    const formData = new FormData();
    formData.append('direccion', nuevaDireccion);
    formData.append('email', nuevoEmail);
    formData.append('clave', nuevaClave);
    formData.append('telefono', nuevoTelefono);
    formData.append('observaciones', nuevasObservaciones);

    const url = `${this.usuariosUrl}${usuario.id}/`;

    return this.http.patch<Usuario>(url, formData);
    
  }
  

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usuariosUrl)
      .pipe(map(usuarios => usuarios as Usuario[]));
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
