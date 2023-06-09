import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Oferta } from '../../models/modelo.oferta';
import { OfertasService } from 'src/app/services/ofertas.service';

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
    this.ofertasService.obtenerOfertas().subscribe((ofertas: Oferta[]) => this.ofertas = ofertas);
    this.crearOfertaForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      descuento: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      fechaVencimiento: ["", [Validators.required]]
    });
  }

  get nombre() { return this.crearOfertaForm.get('nombre'); }

  get descuento() { return this.crearOfertaForm.get('descuento'); }

  get fechaVencimiento() { return this.crearOfertaForm.get('fechaVencimiento'); }

  crear(value: any) {
    this.ofertasService.crear(value.nombre, value.descuento, value.fechaVencimiento)
      .subscribe((oferta: Oferta) => {
        this.refrescar();
      })
  }

  private refrescar(): void {
    this.ofertasService.obtenerOfertas()
      .subscribe((ofertas: Oferta[]) => this.ofertas = ofertas);
  }
}
