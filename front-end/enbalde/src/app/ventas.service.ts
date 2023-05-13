import { Injectable } from '@angular/core';
import { Venta, VentaClass } from './pages/ventas/modelo/modelo.venta';

@Injectable({
  providedIn: 'root'
})

export class VentasService {
  constructor() { }

  obtenerVentas(): Venta[] {
    return [
      new VentaClass("Roberto", [ "1 x Helado" ], 1000),
      new VentaClass("Natalia", [ "1 x Palito", "1 x Bombón" ], 1500),
      new VentaClass("Brian", [ "2 x Palito" ], 500)
    ];
  }
}
