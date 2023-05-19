import { Injectable } from '@angular/core';
import { Usuario } from './pages/perfil/modelo/modelo.usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  constructor() { }

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
