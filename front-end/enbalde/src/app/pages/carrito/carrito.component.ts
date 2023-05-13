import { Component, Input } from '@angular/core';
import { Envio } from '../abm-envios/modelo/modelo.envio';
import { Producto } from '../producto/modelo/modelo.producto';
import { CarritoService } from 'src/app/carrito.service';
import { EnviosService } from 'src/app/envios.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [CarritoService, EnviosService]
})

export class CarritoComponent  {
  total: number = 0
  totalCarrito: number;
  envioElegido: Envio;

  @Input() carrito: Producto [] = []
  @Input() envios: Envio [] = []

  constructor(public carritoProductoService : CarritoService, public enviosService : EnviosService) {
    this.carrito = this.carritoProductoService.obtenerProductosCarrito();
    this.envios = this.enviosService.obtenerEnvios();
    this.envioElegido = this.envios[0];
    this.totalCarrito = this.carritoSuma();
  }

  seleccionarEnvio(event: any) {
    this.envioElegido = this.envios.filter(p => p.id == event.target.value)[0];
    this.totalCarrito = this.carritoSuma()
  }

  carritoSuma(): number {
    let total = 0;
    for(let i = 0; i < this.carrito.length; i++) {
      total += this.carrito[i].precio;
    }

    total += this.envioElegido.costo;
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
    if (producto.cantidadDisponible > 0) {
      producto.cantidadDisponible--;
      this.carrito.push(producto);
      this.total += producto.precio;
    }
    if(producto.cantidadDisponible === 0){
      alert('No hay mas helado disponible de: '+ producto.titulo)
    }
  }


// Elimino un producto al carrito
  eliminarDelCarrito(producto: Producto) {
    const index = this.carrito.findIndex(p => p.id === producto.id);
    if (index !== -1) {
      this.carrito.splice(index, 1);
      this.total -= producto.precio;
      producto.cantidadDisponible++;
    }
  }


 // Creo un array para almacenar los elementos repetidos
  getCarritoReducido(){
    const carritoReducido: any[] = [];
    this.carrito.forEach((producto) => {
      const index = carritoReducido.findIndex((item) => item.producto.id === producto.id);
      if (index !== -1) {
        carritoReducido[index].cantidad++;
      } else {
        carritoReducido.push({ producto, cantidad: 1 });
      }
    });
    return carritoReducido;
  }

}
