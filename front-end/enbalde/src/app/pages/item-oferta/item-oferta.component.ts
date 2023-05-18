import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Oferta, OfertaClass } from '../ofertas/modelo/modelo.oferta';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-item-oferta',
  templateUrl: './item-oferta.component.html',
  styleUrls: ['./item-oferta.component.css']
})

export class ItemOfertaComponent {
  editarItemOfertaForm!: FormGroup
  editando: Oferta;

  @Input() oferta: Oferta = OfertaClass.Nulo;

  constructor(private formBuilder: FormBuilder, private ofertasService: OfertasService) {
    this.editando = OfertaClass.Nulo;
  }

  ngOnInit(): void {
    this.editarItemOfertaForm = this.formBuilder.group({
      nuevoNombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      nuevoDescuento: ["", [Validators.required, Validators.min(0), Validators.max(100)]]
    })
  }

  get nuevoNombre() { return this.editarItemOfertaForm.get('nuevoNombre'); }

  get nuevoDescuento() { return this.editarItemOfertaForm.get('nuevoDescuento'); }

  editar(oferta: Oferta) {
    this.editando = oferta;
  }

  borrar(oferta: Oferta) {
    if (this.ofertasService.borrar(oferta)) {
      alert(`Borrando ${oferta.nombre}`);
    }
    else {
      alert(`Error eliminando ${oferta.nombre}`);
    }
  }

  grabar(oferta: Oferta, value: any) {
    if (this.ofertasService.modificar(oferta, value.nuevoNombre, value.nuevoDescuento)) {
    }

    this.editando = OfertaClass.Nulo;
  }

  cancelar(oferta: Oferta) {
    this.editando = OfertaClass.Nulo;
  }
}
