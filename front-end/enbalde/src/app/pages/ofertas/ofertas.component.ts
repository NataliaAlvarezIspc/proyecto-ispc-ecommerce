import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfertasService } from 'src/app/ofertas.service';
import { Oferta } from './modelo/modelo.oferta';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
  providers: [ OfertasService ]
})

export class OfertasComponent {
  crearOfertaForm!: FormGroup;

  @Input() ofertas: Oferta[] = [];

  constructor(private formBuilder: FormBuilder, private ofertasService: OfertasService) {
  }

  ngOnInit(): void {
    this.ofertas = this.ofertasService.obtenerOfertas();
    this.crearOfertaForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      descuento: ["", [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  get nombre() { return this.crearOfertaForm.get('nombre'); }

  get descuento() { return this.crearOfertaForm.get('descuento'); }

  crear(value: any) {
    if (this.ofertasService.crear(value.nombre, value.descuento)) {
      alert(`${value.nombre} creado exitosamente`);
    }
    else {
      alert(`No se pudo crear la oferta ${value.nombre}`);
    }
  }
}
