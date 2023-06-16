import { Component, Input, OnInit, HostListener, Inject } from '@angular/core';
import { Producto } from '../../models/modelo.producto';
import { ProductosService } from 'src/app/services/productos.service';
import { ViewportScroller } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  providers: [ ProductosService ] // declaramos un proveedor de servicio,
                                  // ProductosService
})

export class CatalogComponent implements OnInit{
  @Input() productos: Producto[] = [];
  isSelected = false;
  selectedProduct: any = null;
  conUsuario: boolean;
  escliente: boolean = false;

  constructor(@Inject(ViewportScroller) private viewportScroller: ViewportScroller, private productosService: ProductosService, private authService: AuthService, private carritoService: CarritoService) {
    this.conUsuario = authService.obtenerUsuarioSiNoExpiro() != null;

  }

  ngOnInit() : void {
    this.productosService.obtenerProductos()
      .subscribe((productos: Producto[]) => this.productos = productos);

      if (this.conUsuario) {
        this.escliente = this.authService.esAdmin();
      }
  }

  toggleSelection(producto:any) {
    const screenWidth = window.innerWidth;
    const targetWidth = 780;

    if (screenWidth >= targetWidth) {
    this.isSelected = !this.isSelected;
    this.selectedProduct = producto;
     }else{}

  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: any) {
    if (!target.closest('.quitarZoom')) {
      this.isSelected = false;
    }
  }

  //Acomodé los ID y agg las img, junto con la funcion de agregarAlCarrito();
  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregarProductoAlCarrito(producto)
      .subscribe(p => {
        if (p) {
          alert('Agregaste al carrito un helado de: ' + producto.nombre)
          producto.cantidad -= 1;
        }
        else {
          alert('Error agregando artículo al carrito');
        }
      });
  }
}
