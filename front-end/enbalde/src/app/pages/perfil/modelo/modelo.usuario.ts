export enum TipoUsuario {
  Administrador = 1,
  Cliente = 2
}

export interface Usuario {
  id: number;
  tipo: number;
  nombre: string;
  apellido: string;
  direccion: string;
  usuario: string;
  email: string;
  observaciones: string;
}

export class Administrador implements Usuario {
  constructor(id: number, nombre: string, apellido: string, direccion: string, usuario: string, email: string, observaciones: string) {
    this.id = id;
    this.tipo = TipoUsuario.Administrador;
    this.nombre = nombre;
    this.apellido = apellido;
    this.direccion = direccion;
    this.usuario = usuario;
    this.email = email;
    this.observaciones = observaciones;
  }

  id: number;
  tipo: number;
  nombre: string;
  apellido: string;
  direccion: string;
  usuario: string;
  email: string;
  observaciones: string;
}

export class Cliente implements Usuario {
  constructor(id: number, nombre: string, apellido: string, direccion: string, usuario: string, email: string, observaciones: string) {
    this.id = id;
    this.tipo = TipoUsuario.Cliente;
    this.nombre = nombre;
    this.apellido = apellido;
    this.direccion = direccion;
    this.usuario = usuario;
    this.email = email;
    this.observaciones = observaciones;
  }

  id: number;
  tipo: number;
  nombre: string;
  apellido: string;
  direccion: string;
  usuario: string;
  email: string;
  observaciones: string;
}
