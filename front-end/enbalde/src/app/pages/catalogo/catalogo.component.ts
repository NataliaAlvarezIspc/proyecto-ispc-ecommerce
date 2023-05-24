import { Component, Input, OnInit, HostListener } from '@angular/core';
import { Producto } from '../../models/modelo.producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  providers: [ ProductosService ] // declaramos un proveedor de servicio,
                                  // ProductosService
})

export class CatalogComponent implements OnInit{
  carrito: Producto[] = [];
  @Input() productos: Producto [] = [];
  isSelected = false;
  selectedProduct: any = null;

  constructor(public productosService: ProductosService) {
  }

  ngOnInit() : void {
    this.productosService.obtenerProductos()
      .subscribe((productos: Producto[]) => this.productos = productos);
  }

  toggleSelection(producto:any) {
    this.isSelected = !this.isSelected;
    this.selectedProduct = producto;
  }
  
  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: any) {
    if (!target.closest('.quitarZoom')) {
      this.isSelected = false;
    }
  }
 
  //Acomodé los ID y agg las img, junto con la funcion de agregarAlCarrito();
  agregarAlCarrito(producto: Producto) {
    if (producto.cantidadDisponible > 0) {
      this.isSelected = true;
      producto.cantidadDisponible--;
      this.carrito.push(producto);
      alert('Agregaste al carrito un helado de: ' + producto.titulo)
    }
    // if (producto != this.divSeleccionado) {
    //   this.divSeleccionado = null;
    // }
    // Corregir bug
    if(producto.cantidadDisponible === 0){
      alert('No hay mas helado disponible de: '+ producto.titulo)
    }
  }
}
