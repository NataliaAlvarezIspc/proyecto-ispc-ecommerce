import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Oferta } from '../../models/modelo.oferta';
import { OfertasService } from 'src/app/services/ofertas.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-item-oferta',
  templateUrl: './item-oferta.component.html',
  styleUrls: ['./item-oferta.component.css'],
  providers: [OfertasService, FuncionesService, DatePipe]
})

export class ItemOfertaComponent {
  editarItemOfertaForm!: FormGroup
  editando?: Oferta;

  @Input() oferta?: Oferta;
  @Output() refrescar: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private ofertasService: OfertasService, private funcionesService: FuncionesService, private datePipe: DatePipe) {
    this.editando = undefined;
  }

  ngOnInit(): void {
    this.editarItemOfertaForm = this.formBuilder.group({
      nuevoNombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      nuevoDescuento: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      nuevaFechaVencimiento: ["", [Validators.required]]
    })
  }

  get nuevoNombre() { return this.editarItemOfertaForm.get('nuevoNombre'); }

  get nuevoDescuento() { return this.editarItemOfertaForm.get('nuevoDescuento'); }

  editar(oferta: Oferta) {
    this.editarItemOfertaForm.get("nuevoNombre")?.setValue(oferta.nombre);
    this.editarItemOfertaForm.get("nuevoDescuento")?.setValue(oferta.descuento);
    this.editarItemOfertaForm.get("nuevaFechaVencimiento")?.setValue(this.datePipe.transform(oferta.fechaVencimiento, 'yyyy-MM-dd'));
    this.editando = oferta;
  }

  borrar(oferta: Oferta) {
    this.ofertasService.borrar(oferta)
      .subscribe((_: boolean) => this.refrescar.emit());
  }

  grabar(oferta: Oferta, value: any) {
    this.ofertasService.modificar(oferta, value.nuevoNombre, value.nuevoDescuento, value.nuevaFechaVencimiento)
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
