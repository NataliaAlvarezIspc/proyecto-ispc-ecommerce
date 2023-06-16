import { Component, Input } from '@angular/core';
import { Envio } from '../../models/modelo.envio';
import { Seleccion } from '../../models/modelo.seleccion';
import { Router } from '@angular/router';
import { EnviosService } from 'src/app/services/envios.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { AuthService } from 'src/app/services/auth.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { TipoPago } from 'src/app/models/modelo.venta';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [CarritoService, EnviosService, FuncionesService]
})

export class CarritoComponent  {
  totalCarrito: number = 0;
  envioElegido: Envio;
  pagoElegido: TipoPago;

  @Input() carrito: Seleccion[];
  @Input() envios: Envio[];
  @Input() visualEnbaldePago: string;
  @Input() ticket: string;

  constructor(private carritoService : CarritoService, private enviosService : EnviosService, private router: Router, private authService: AuthService, public funcionesService: FuncionesService) {
    this.envioElegido = {
      id: -1,
      nombre: "Default",
      monto: 0
    }

    this.carrito = [];
    this.envios = [];
    this.pagoElegido = TipoPago.EFECTIVO_A_PAGAR;
    this.visualEnbaldePago = "";
    this.ticket = "";
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

    this.carritoService.obtenerProductosCarrito()
      .subscribe((selecciones: Seleccion[]) => {
        this.carrito = selecciones;
        this.carritoSuma();
      });
  }

  seleccionarEnvio(event: any) {
    this.envioElegido = this.envios.filter(p => p.id == event.target.value)[0];
    this.carritoSuma()
  }

  carritoSuma(): void {
    this.totalCarrito = this.carrito.reduce(function(t, i) { return t + i.total; }, 0.00) + this.envioElegido.monto;
  }

  pagar() {
    if (this.pagoElegido == TipoPago.EFECTIVO_A_PAGAR) {
      this.carritoService.checkout(this.envioElegido, TipoPago.EFECTIVO_A_PAGAR)
        .subscribe(venta => {
          alert("Has comprado el carrito con éxito!");
          this.envolverProductosDelCarrito();
        });
    }
    else {
      this.carritoService.checkoutEnEnbalde(this.carrito, this.envioElegido)
        .subscribe((response: any) => {
          this.visualEnbaldePago = response.html;
          this.ticket = response.ticket;
        });
    }
 }

  vaciarCarrito() {
    // vaciar el carrito abandona el carrito, el servidor retornara los productos
    // si el carrito no fue pagado
    return this.envolverProductosDelCarrito();
  }

  envolverProductosDelCarrito(): void {
    this.carritoService.entregarCarrito()
      .subscribe(c => {
        if (c > 0) {
          this.authService.cambiarCarrito(c);
          this.carrito = [];
          this.totalCarrito = 0;
        }
      });
  }

  restarDelCarrito(seleccion: Seleccion) {
    this.carritoService.quitarProductoAlCarrito(seleccion.articulo)
      .subscribe((resultado: Seleccion) => {
        let index = this.carrito.indexOf(seleccion);
        if (index !== -1) {
          this.carrito[index].cantidad = resultado.cantidad;
          this.carrito[index].descuento = resultado.descuento;
          this.carrito[index].total = resultado.total;

          if (seleccion.cantidad <= 0) {
            this.carrito = this.carrito.filter(s => s.articulo.id != seleccion.articulo.id)
          }
        }

        this.carritoSuma();
      });
  }

  sumarAlCarrito(seleccion: Seleccion) {
    this.carritoService.agregarProductoAlCarrito(seleccion.articulo)
      .subscribe((resultado: Seleccion) => {
        let index = this.carrito.indexOf(seleccion);
        if (index !== -1) {
          this.carrito[index].cantidad = resultado.cantidad;
          this.carrito[index].descuento = resultado.descuento;
          this.carrito[index].total = resultado.total;
        }

        this.carritoSuma();
      });
  }

  cambioPago(tipoPago: TipoPago) {
    this.pagoElegido = tipoPago;
  }

  refrescar() {
  }
}
