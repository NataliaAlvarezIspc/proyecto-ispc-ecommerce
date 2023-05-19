import { Component } from '@angular/core';
import { ProductosService } from 'src/app/productos.service';
import { RouterLink } from '@angular/router';
import { Producto } from 'src/app/pages/producto/modelo/modelo.producto';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ ProductosService]
})



export class HeaderComponent {
  buscarTerm!: string;
  buscarResults!: any[];

  constructor (private productosService: ProductosService) {}

  buscar(){
    this.productosService.buscar(this.buscarTerm).subscribe(results => {
      this.buscarResults = results;
      return results
    })
  }

}
