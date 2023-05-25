import { Component, Input } from '@angular/core';
import { Envio } from '../../models/modelo.envio';
import { Producto } from '../../models/modelo.producto';
import { Seleccion, SeleccionClass } from '../../models/modelo.seleccion';
import { Router } from '@angular/router';
import { EnviosService } from 'src/app/services/envios.service';
import { CarritoService } from 'src/app/services/carrito.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [CarritoService, EnviosService]
})

export class CarritoComponent  {
  total: number = 0
  totalCarrito: number = 0;
  envioElegido?: Envio;


  @Input() carrito: Seleccion[] = [];
  @Input() envios: Envio[] = [];

  uncheckOther(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const checkboxes = Array.from(document.getElementsByName('opcionPago')) as HTMLInputElement[];
    checkboxes.forEach(cb => {
      if (cb !== checkbox) {
        cb.checked = false;
      }
    });
  }


  constructor(public carritoProductoService : CarritoService, public enviosService : EnviosService, private router: Router) {
  }
// Agrego enrutamiento
aggProductos() {
  this.router.navigate(['/catalogo']);
}


  ngOnInit(): void {
    this.enviosService.obtenerEnvios()
      .subscribe((envios: Envio[]) => {
        this.envios = envios;
        this.envioElegido = envios[0];
      });



    this.carritoProductoService.obtenerProductosCarrito()
      .subscribe((selecciones: Seleccion[]) => {
        this.carrito = selecciones;
        this.totalCarrito = this.carritoSuma();
      });
  }

  seleccionarEnvio(event: any) {
    this.envioElegido = this.envios.filter(p => p.id == event.target.value)[0];
    this.totalCarrito = this.carritoSuma()
  }

  carritoSuma(): number {
    let total = 0;
    for(let i = 0; i < this.carrito.length; i++) {
      total += this.carrito[i].cantidad * this.carrito[i].producto.precio; // TODO: Esto deberia estar dentro de carrito
    }

    total += this.envioElegido?.costo ?? 0;
    return total;
  }

// Elimino todos los productos una vez pagados y restauro el valor total
  pagar(){
    alert('Has pagado correctamente');
    this.total = 0;
    this.totalCarrito = 0; // Cree esta variable solamente para poder hacer uso del totalCarrito
    this.carrito = [];
    const carritoReducido = this.getCarritoReducido();
    alert('¡Su producto ya está en camino!')
  }



// Agrego un producto al carrito
  agregarAlCarrito(producto: Producto) {
    if (producto.cantidad > 0) {
      producto.cantidad--;
      this.carrito.push(new SeleccionClass(producto, 1));
      this.total += producto.precio;
    }
    if(producto.cantidad === 0){
      alert('No hay mas helado disponible de: '+ producto.nombre)
    }
  }


// Elimino un producto al carrito
  eliminarDelCarrito(producto: Producto) {
    const index = this.carrito.findIndex(p => p.producto.id === producto.id);
    if (index !== -1) {
      this.carrito.splice(index, 1);
      this.total -= producto.precio;
      producto.cantidad++;
    }
  }


 // Creo un array para almacenar los elementos repetidos
  getCarritoReducido(){
    const carritoReducido: any[] = [];
    this.carrito.forEach((seleccion) => {
      const index = carritoReducido.findIndex((item) => item.producto.id === seleccion.producto.id);
      if (index !== -1) {
        carritoReducido[index].cantidad++;
      } else {
        carritoReducido.push(new SeleccionClass(seleccion.producto, 1));
      }
    });
    return carritoReducido;
  }

}
