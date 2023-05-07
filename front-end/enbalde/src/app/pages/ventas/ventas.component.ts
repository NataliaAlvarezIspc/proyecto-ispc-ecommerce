import { Component, Input } from '@angular/core';
import { Venta, VentaClass } from './modelo/modelo.venta';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})

export class VentasComponent {
  @Input() ventas: Venta [] = [
    new VentaClass("Roberto", [ "1 x Helado" ], 1000),
    new VentaClass("Natalia", [ "1 x Palito", "1 x Bombón" ], 1500),
    new VentaClass("Brian", [ "2 x Palito" ], 500)
  ];
}
