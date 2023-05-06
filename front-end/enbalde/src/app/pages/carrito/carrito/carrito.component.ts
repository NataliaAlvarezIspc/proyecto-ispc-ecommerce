import { Component, Input } from '@angular/core';
import { Producto, ProductoClass } from '../../producto/modelo/modelo.producto';
import { Envio, EnvioClass } from '../../abm-envios/modelo/modelo.envio';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent  {
  total: number = 0
  totalCarrito: number;
  envioElegido: Envio;

  constructor() {
    this.envioElegido = this.envios[0];
    this.totalCarrito = this.carritoSuma();
  }

  @Input() carrito: Producto [] = [
    new ProductoClass(1, "Helado Tentación Dark", "Sabor a crema chocolatozo", 1100, 1, "/assets/img/chocolate.jpg"),
    new ProductoClass(2, "Helado Tentación White", "Sabor a fresco granizado", 500, 1, "/assets/img/chocolate.jpg")
  ];

  @Input() envios: Envio [] = [
    new EnvioClass(1, "Retiro por tienda", 0),
    new EnvioClass(2, "Envío en las próximas 3 horas", 150),
    new EnvioClass(3, "Envío inmediato", 500)
  ];

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
