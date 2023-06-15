import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Oferta } from '../../models/modelo.oferta';
import { OfertasService } from 'src/app/services/ofertas.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { DatePipe } from '@angular/common';
import { constantes } from 'src/environment/constantes';

@Component({
  selector: 'app-item-oferta',
  templateUrl: './item-oferta.component.html',
  styleUrls: ['./item-oferta.component.css'],
  providers: [OfertasService, FuncionesService, DatePipe]
})

export class ItemOfertaComponent {
  readonly constantes = constantes;
  editarItemOfertaForm!: FormGroup
  editando?: Oferta;

  @Input() oferta?: Oferta;
  @Output() refrescar: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private ofertasService: OfertasService, private funcionesService: FuncionesService, private datePipe: DatePipe) {
    this.editando = undefined;
    this.oferta = undefined;
  }

  ngOnInit(): void {
    this.editarItemOfertaForm = this.formBuilder.group({
      nuevoNombre: ["", [Validators.required, Validators.minLength(constantes.MINIMO_NOMBRE_OFERTA), Validators.maxLength(constantes.MAXIMO_NOMBRE_OFERTA)]],
      nuevoDescuento: ["", [Validators.required, Validators.min(constantes.MINIMO_DESCUENTO), Validators.max(constantes.MAXIMO_DESCUENTO)]],
      nuevaFechaVencimiento: ["", [Validators.required]],
      nuevosArticulos: [this.formBuilder.array([])]
    })
  }

  get nuevoNombre() { return this.editarItemOfertaForm.get('nuevoNombre'); }

  get nuevoDescuento() { return this.editarItemOfertaForm.get('nuevoDescuento'); }

  get nuevosArticulos() { return this.editarItemOfertaForm.get("nuevosArticulos"); }

  editar(oferta: Oferta) {
    this.editarItemOfertaForm.get("nuevoNombre")?.setValue(oferta.nombre);
    this.editarItemOfertaForm.get("nuevoDescuento")?.setValue(oferta.descuento);
    this.editarItemOfertaForm.get("nuevaFechaVencimiento")?.setValue(this.datePipe.transform(oferta.fechaVencimiento, 'yyyy-MM-dd'));
    this.editarItemOfertaForm.get("nuevosArticulos")?.setValue(oferta.articulos);
    this.editando = oferta;
  }

  borrar(oferta: Oferta) {
    this.ofertasService.borrar(oferta)
      .subscribe(_ => this.refrescar.emit());
  }

  grabar(oferta: Oferta, value: any) {
    this.ofertasService.modificar(oferta, value.nuevoNombre, value.nuevoDescuento, value.nuevaFechaVencimiento, value.nuevosArticulos)
      .subscribe((nuevaOferta: Oferta) => {
        this.editando = undefined;
        this.refrescar.emit();
    });
  }

  cancelar(oferta: Oferta) {
    this.editando = undefined;
  }

  mostrarFecha(fecha: Date) {
    return this.funcionesService.visualizarFecha(fecha);
  }
}
