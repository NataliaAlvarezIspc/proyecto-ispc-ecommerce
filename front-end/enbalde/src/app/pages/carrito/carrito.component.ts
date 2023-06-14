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
  providers: [CarritoService, EnviosService, AuthService, FuncionesService]
})

export class CarritoComponent  {
  totalCarrito: number = 0;
  envioElegido: Envio;
<<<<<<< HEAD
  pagoElegido: TipoPago;
=======


>>>>>>> dev

  @Input() carrito: Seleccion[];
  @Input() envios: Envio[];

  constructor(private carritoService : CarritoService, private enviosService : EnviosService, private router: Router, private authService: AuthService, public funcionesService: FuncionesService) {
    this.envioElegido = {
      id: -1,
      nombre: "Default",
      monto: 0
    }

    this.carrito = [];
    this.envios = [];
    this.pagoElegido = TipoPago.EFECTIVO_A_PAGAR;
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

  vaciarCarrito() {
    this.carritoService.refrescarCarrito()
          .subscribe(c => {
            if (c > 0) this.authService.cambiarCarrito(c);
      this.carrito = [];
      this.totalCarrito = 0
    })
  }

  pagar() {
    this.carritoService.checkout(this.carrito, this.envioElegido, this.pagoElegido)
      .subscribe(resultado => {
        if (typeof resultado == 'string') {
          alert(resultado);
        }
        else {
          this.carritoService.refrescarCarrito()
            .subscribe(c => {
              if (c > 0) this.authService.cambiarCarrito(c);
              alert('Has pagado correctamente');
              this.totalCarrito = 0; // Cree esta variable solamente para poder hacer uso del totalCarrito
              this.carrito = [];
            });
          }
      });
  }

  restarDelCarrito(seleccion: Seleccion) {
    this.carritoService.quitarProductoAlCarrito(seleccion.articulo)
      .subscribe(() => {
        seleccion.cantidad -= 1
        if (seleccion.cantidad <= 0) {
          this.carrito = this.carrito.filter(s => s.articulo.id != seleccion.articulo.id)
        }
      });
  }

  sumarAlCarrito(seleccion: Seleccion) {
    this.carritoService.agregarProductoAlCarrito(seleccion.articulo)
      .subscribe(() => seleccion.cantidad += 1)
  }

<<<<<<< HEAD
  cambioPago(tipoPago: TipoPago) {
    this.pagoElegido = tipoPago;
  }
=======
  crearId = this.funcionesService.crearId;

>>>>>>> dev
}
