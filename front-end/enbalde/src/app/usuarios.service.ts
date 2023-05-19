import { Injectable } from '@angular/core';
import { Usuario } from './pages/perfil/modelo/modelo.usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './pages/perfil/modelo/modelo.usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  private usuariosUrl: string = 'assets/usuarios.json';

  constructor(private http: HttpClient) {
  }

  registrar(nombre: string, apellido: string, email: string, direccion: string, usuario: string, clave: string, telefono: string): boolean {
    if (usuario == 'Natalia')
      return false
    else
      return true
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
