import { Component, Input } from '@angular/core';
import { Producto } from './modelo/modelo.producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent {
  @Input() muestra: boolean = true;

  @Input() producto: Producto = {
    id: 0,
    titulo: 'Tentatenbalde Chocolate',
    descripcion:'Helado de chocolate artesanal',
    precio: 0,
    cantidadDisponible: 0,
    imagen: ["/src/assets/img/HeladoChocolate.jpeg"],
  }
}
