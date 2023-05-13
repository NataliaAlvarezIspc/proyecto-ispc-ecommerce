import { Injectable } from '@angular/core';
import { Envio, EnvioClass } from './pages/abm-envios/modelo/modelo.envio';

@Injectable({
  providedIn: 'root'
})
export class EnviosService {

  constructor() { }

  obtenerEnvios() : Envio[] {
    return [
      new EnvioClass(1, "Retiro por tienda", 0),
      new EnvioClass(2, "Envío en las próximas 3 horas", 150),
      new EnvioClass(3, "Envío inmediato", 500)
    ];
  }
}
