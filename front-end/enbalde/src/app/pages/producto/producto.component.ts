  import { Component, Input } from '@angular/core';
  import { Producto } from '../producto/modelo/modelo.producto';


  @Component({
    selector: 'app-producto',
    templateUrl: './producto.component.html',
    styleUrls: ['./producto.component.css']
  })
  export class ProductoComponent {

    @Input() producto: Producto = {
      titulo: 'Tentatenbalde Chocolate',
      descripcion:'Helado de chocolate artesanal',
      precio: 0,
      imagen: ["/src/assets/img/HeladoChocolate.jpeg"],
      id: 0
  }
  }
