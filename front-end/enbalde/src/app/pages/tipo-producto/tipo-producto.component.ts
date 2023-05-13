import { Component, Input } from '@angular/core';
import { TipoProducto, TipoProductoClass } from '../producto/modelo/modelo.tipoProducto';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.css']
})

export class TipoProductoComponent {
  @Input() tipoProductos: TipoProducto [] = [
  ];

  editar(tipoProducto: TipoProducto) {
    alert(`Editando ${tipoProducto.nombre} (próximamente)`);
  }

  borrar(tipoProducto: TipoProducto) {
    alert(`Borrando ${tipoProducto.nombre} (próximamente)`);
  }

  crear() {
    alert("Creando tipo de producto nuevo (próximamente)");
  }
}
