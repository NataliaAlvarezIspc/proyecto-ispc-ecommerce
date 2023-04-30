import { Component, Input } from '@angular/core';
import {Producto} from './modelo/modelo.producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {

  @Input() producto: Producto = {'';
    titulo: '',
    precio: 0,
    imagen: [],
    id: 0
}
}
