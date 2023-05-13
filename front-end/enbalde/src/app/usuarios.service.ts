import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor() { }

  registrar(fname: string|null|undefined, lname: string|null|undefined, mail: string|null|undefined, adress: string|null|undefined, user: string|null|undefined , password: string|null|undefined, phone: string|null|undefined) {
    if (user== 'Natalia' && password == '123456')
      return false
    else
      return true
  }

  login(user: string|null|undefined , password: string|null|undefined){
    if (user== 'Natalia' && password == '123456')
      return true
    else 
      return false

  }

  restablecerClave(mail: string|null|undefined){
    return []
  }
}
