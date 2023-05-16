import { Component, Input } from '@angular/core';
import { Compra, CompraClass } from './modelo/modelo.compra';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  @Input() compras: Compra [] = [];

  todasCompras: Compra[] = [
    new CompraClass(new Date("01/30/2022").getTime(), [ "1 x Helado" ], 1000),
    new CompraClass(new Date("05/15/2022").getTime(), [ "1 x Helado" ], 1000),
    new CompraClass(new Date("01/30/2023").getTime(), [ "1 x Helado" ], 1000)
  ];
  comprasUltimoMes: Compra[] = [
    new CompraClass(new Date("01/30/2022").getTime(), [ "1 x Helado" ], 1000),
    new CompraClass(new Date("05/15/2022").getTime(), [ "1 x Helado" ], 1000),
    new CompraClass(new Date("01/30/2023").getTime(), [ "1 x Helado" ], 1000)
  ];
  ultimaCompra: Compra | undefined;

  ngOnChanges() {
    this.todasCompras = this.compras;
    this.comprasUltimoMes = this.obtenerComprasUltimoMes();
    this.ultimaCompra = this.obtenerUltimaCompra();
  }

  obtenerComprasUltimoMes(): Compra[] {
    const fechaActual = new Date();
    const unMesAtras = new Date();
    unMesAtras.setMonth(unMesAtras.getMonth() - 1);

    return this.compras.filter(compra => {
      const fechaCompra = new Date(compra.fecha);
      return fechaCompra >= unMesAtras && fechaCompra <= fechaActual;
    });
  }

  obtenerUltimaCompra(): Compra | undefined {
    return this.compras.reduce((ultimaCompra: Compra | undefined, compra: Compra) => {
      if (!ultimaCompra || compra.fecha > ultimaCompra.fecha) {
        return compra;
      }
      return ultimaCompra;
    }, undefined);
  }
}
