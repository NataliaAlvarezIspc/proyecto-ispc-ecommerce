import { Component, Input } from '@angular/core';
import { TipoProducto } from '../producto/modelo/modelo.tipoProducto';
import { ProductosService } from 'src/app/productos.service';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.css'],
  providers: [ ProductosService ]
})

export class TipoProductoComponent {
  @Input() tipoProductos: TipoProducto [] = [ ];

  constructor(private productosService: ProductosService) {
  }

  ngOnInit(): void {
    this.tipoProductos = this.productosService.obtenerTipos();
  }

  editar(tipoProducto: TipoProducto) {
    alert(`Editando ${tipoProducto.nombre} (próximamente)`);
  }

  borrar(tipoProducto: TipoProducto) {
    if (confirm(`Está seguro que desea borrar ${tipoProducto.nombre}?`)) {
      this.productosService.borrarTipo(tipoProducto);
    }
  }

  crear() {
    alert("Creando tipo de producto nuevo (próximamente)");
  }
}
