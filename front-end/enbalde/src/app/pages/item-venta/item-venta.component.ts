import { HttpStatusCode } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { Seleccion } from 'src/app/models/modelo.seleccion';
import { TipoPago, Venta } from 'src/app/models/modelo.venta';
import { FuncionesService } from 'src/app/services/funciones.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-item-venta',
  templateUrl: './item-venta.component.html',
  styleUrls: ['./item-venta.component.css'],
  providers: [FuncionesService, VentasService]
})

export class ItemVentaComponent {
  editarItemVentaForm!: FormGroup;
  @Input() venta?: Venta;
  @Input() odd: boolean;
  @Input() editando?: Venta;
  @Output() refrescar: EventEmitter<ResultadoApi> = new EventEmitter<ResultadoApi>();

  tipoPagos = [
    { id: TipoPago.EFECTIVO_A_PAGAR, nombre: "Efectivo a pagar" },
    { id: TipoPago.EFECTIVO_PAGADO, nombre: "Efectivo cobrado" },
    { id: TipoPago.ENBALDE_PAGO, nombre: "Enbalde Pago" }
  ];

  constructor(private formBuilder: FormBuilder, public funcionesService: FuncionesService, private ventasService: VentasService) {
    this.venta = undefined;
    this.odd = true;
    this.editando = undefined;
  }

  ngOnInit(): void {
    this.editarItemVentaForm = this.formBuilder.group({
      nuevoTipoPago: ["", [Validators.required]],
    })
  }

  get nuevoTipoPago() { return this.editarItemVentaForm.get('nuevoTipoPago'); }

  obtenerArticulosVendidos(selecciones: Seleccion[]): string {
    return this.funcionesService.visualizarArticulos(selecciones);
  }

  visualizarFecha(fecha: Date): string {
    return this.funcionesService.visualizarFecha(fecha);
  }

  obtenerTipoPago = (tipoPago: TipoPago) => this.tipoPagos.filter(t => t.id == tipoPago)[0].nombre;

  cancelar() {
    this.editando = undefined;
  }

  grabar(venta: Venta, value: any) {
    this.editarItemVentaForm.get("nuevoTipoPago")?.setValue(venta.pago);
    this.editando = venta;
  }

  borrar(venta: Venta) {
    this.ventasService.borrarVenta(venta)
      .subscribe({
        next: () => { this.refrescar.emit({ mensaje: `Venta ${venta.id} borrado exitosamente.`, data: {}, status: HttpStatusCode.Ok }) },
        error: () => { this.refrescar.emit({ mensaje: `Error borrando ${venta.id}, refresque e intente nuevamente.`, data: {}, status: HttpStatusCode.BadRequest }) },
        complete: () => {}
      });
  }

  editar(venta: Venta) {
    this.editando = venta;
  }
}
