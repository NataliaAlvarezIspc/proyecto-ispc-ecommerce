import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Seleccion } from 'src/app/models/modelo.seleccion';
import { TipoPago, Venta } from 'src/app/models/modelo.venta';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-item-venta',
  templateUrl: './item-venta.component.html',
  styleUrls: ['./item-venta.component.css'],
  providers: [FuncionesService]
})

export class ItemVentaComponent {
  editarItemVentaForm!: FormGroup;
  @Input() venta?: Venta;
  @Input() odd: boolean;
  @Input() idEditando: number;

  tipoPagos = [
    { id: TipoPago.EFECTIVO_A_PAGAR, nombre: "Efectivo a pagar" },
    { id: TipoPago.EFECTIVO_PAGADO, nombre: "Efectivo cobrado" },
    { id: TipoPago.ENBALDE_PAGO, nombre: "Enbalde Pago" }
  ];

  constructor(private formBuilder: FormBuilder, public funcionesService: FuncionesService) {
    this.venta = undefined;
    this.odd = true;
    this.idEditando = 0;
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
    this.idEditando = 0;
  }

  grabar(venta: Venta, value: any) {
  }
}
