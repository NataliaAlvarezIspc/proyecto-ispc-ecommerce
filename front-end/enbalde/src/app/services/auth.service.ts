import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../models/modelo.usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private autenticado$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public autenticado = this.autenticado$.asObservable();
  public usuario?: Usuario;

  constructor() { }

  autenticadoComo(usuarioActual: Usuario) {
    console.log("autenticando")
    this.usuario = usuarioActual;
    this.autenticado$.next(true);
    console.log("autenticado")
  }
}
