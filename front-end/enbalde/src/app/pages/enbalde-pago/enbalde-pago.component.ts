import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Envio } from 'src/app/models/modelo.envio';
import { TipoPago, Venta } from 'src/app/models/modelo.venta';
import { AuthService } from 'src/app/services/auth.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { EnbaldePagoService } from 'src/app/services/enbalde-pago.service';

@Component({
  selector: 'app-enbalde-pago',
  templateUrl: './enbalde-pago.component.html',
  styleUrls: ['./enbalde-pago.component.css']
})

export class EnbaldePagoComponent {
  private valor: string;
  private _ticket: string;

  @Output() asentarVenta: EventEmitter<Venta> = new EventEmitter<Venta>();
  @Input() envio?: Envio;
  @Input() contenido: string;
  @Input() autorizando: boolean;
  @Input() set ticket(value: string) {
    if (this._ticket != value) {
      this.autorizando = true;
    }

    this._ticket = value;
  }
  get ticket(): string {
    return this._ticket;
  }

  constructor(public sanitized: DomSanitizer, private enbaldePagoService: EnbaldePagoService, private carritoService: CarritoService, private authService: AuthService, private router: Router) {
    this.contenido = "";
    this.valor = "";
    this._ticket = this.ticket = "";
    this.autorizando = true;
    this.envio = undefined;
  }

  confirmar() {
    this.enbaldePagoService.pagar(this.valor, this.ticket)
      .subscribe(resultado => {
        this.autorizando = false;
        this.contenido = resultado.mensaje;

        if (resultado.status) {
          this.carritoService.checkout(this.envio!, TipoPago.ENBALDE_PAGO, resultado.transaccion)
            .subscribe((venta: Venta) => {
              this.asentarVenta.emit(venta);
            });
        }
      });
  }

  cambiar(target: any) {
    this.valor = target.value;
  }

  cerrarModal(event: any) {
    if (!event || event.target === event.currentTarget) {
      this.contenido = "";
    }
  }
}
