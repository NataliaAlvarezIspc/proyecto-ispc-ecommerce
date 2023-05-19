import { Injectable } from '@angular/core';
import { Usuario } from './pages/perfil/modelo/modelo.usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {
  constructor() { }

  registrar(fname: string|null|undefined, lname: string|null|undefined, mail: string|null|undefined, adress: string|null|undefined, user: string|null|undefined , password: string|null|undefined, phone: string|null|undefined): boolean {
    if (user== 'Natalia')
      return false
    else
      return true
  }

  login(user: string|null|undefined , password: string|null|undefined): boolean {
    if (user== 'Natalia' && password == '123456')
      return true
    else
      return false
  }

  restablecerClave(mail: string|null|undefined): boolean {
    return true
  }

  contacto(nombre: string, email: string, razon: string, mensaje: string): boolean {
    return true;
  }

  modificar(usuario: Usuario, nuevaDireccion: string, nuevoEmail: string, nuevaClave: string, nuevoTelefono: string, nuevasObservaciones: string) {
    return true;
  }
}
