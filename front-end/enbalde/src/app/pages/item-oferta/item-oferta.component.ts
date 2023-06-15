import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Oferta } from '../../models/modelo.oferta';
import { OfertasService } from 'src/app/services/ofertas.service';
import { FuncionesService } from 'src/app/services/funciones.service';
import { DatePipe } from '@angular/common';
import { Producto } from 'src/app/models/modelo.producto';

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
  @Input() productos: Producto[];
  @Output() refrescar: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private ofertasService: OfertasService, public funcionesService: FuncionesService, private datePipe: DatePipe) {
    this.editando = undefined;
    this.oferta = undefined;
    this.productos = [];
  }

  ngOnInit(): void {
    this.editarItemOfertaForm = this.formBuilder.group({
      nuevoNombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      nuevoDescuento: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
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
    this.editarItemOfertaForm.get("nuevosArticulos")?.setValue(oferta.articulos.map(a => a.id));
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
