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
  telefono: string;
  usuario: string;
  clave: string;
  email: string;
  observaciones: string;
}

export class UsuarioClass implements Usuario {
  constructor(id: number, tipo: TipoUsuario, nombre: string, apellido: string, direccion: string, telefono: string, usuario: string, clave: string, email: string, observaciones: string) {
    this.id = id;
    this.tipo = tipo;
    this.nombre = nombre;
    this.apellido = apellido;
    this.direccion = direccion;
    this.telefono = telefono;
    this.usuario = usuario;
    this.clave = clave;
    this.email = email;
    this.observaciones = observaciones;
  }

  id: number;
  tipo: number;
  nombre: string;
  apellido: string;
  direccion: string;
  telefono: string;
  usuario: string;
  clave: string;
  email: string;
  observaciones: string;
}

export class Administrador extends UsuarioClass {
  constructor(id: number, nombre: string, apellido: string, direccion: string, telefono: string, usuario: string, clave: string, email: string, observaciones: string) {
    super(id, TipoUsuario.Administrador, nombre, apellido, direccion, telefono, usuario, clave, email, observaciones)
  }
}

export class Cliente extends UsuarioClass {
  constructor(id: number, nombre: string, apellido: string, direccion: string, telefono: string, usuario: string, clave: string, email: string, observaciones: string) {
    super(id, TipoUsuario.Cliente, nombre, apellido, direccion, telefono, usuario, clave, email, observaciones)
  }
}
