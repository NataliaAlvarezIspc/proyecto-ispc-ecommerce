import { Injectable } from '@angular/core';
import { Envio, EnvioClass } from './pages/abm-envios/modelo/modelo.envio';

@Injectable({
  providedIn: 'root'
})

export class EnviosService {
  envios: EnvioClass[];

  constructor() {
    this.envios = [
      new EnvioClass(1, "Retiro por tienda", 0),
      new EnvioClass(2, "Envío en las próximas 3 horas", 150),
      new EnvioClass(3, "Envío inmediato", 500)
    ];
  }

  obtenerEnvios() : Envio[] {
    return this.envios;
  }

  crear(nombre: string, precio: number): boolean {
    if (this.envios.findIndex(p => p.nombre == nombre) != -1) {
      return false;
    }

    return true;
  }

  borrar(envio: Envio): boolean {
    return true;
  }

  modificar(envio: Envio, nombre: string, costo: number): boolean {
    return true;
  }
}
