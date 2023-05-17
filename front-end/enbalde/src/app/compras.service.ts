import { Injectable } from '@angular/core';
import { CompraClass } from './pages/compras/modelo/modelo.compra';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor() { }

  obtenerCompras () {
    return [new CompraClass(new Date("01/12/2022").getTime(), [ "1 x Helado" ], 1000)]
  }

}
