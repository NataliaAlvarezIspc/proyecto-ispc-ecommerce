import { Component, Input } from '@angular/core';
import { Envio } from './modelo/modelo.envio';
import { EnviosService } from 'src/app/envios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-abm-envios',
  templateUrl: './abm-envios.component.html',
  styleUrls: ['./abm-envios.component.css'],
  providers: [ EnviosService ]
})

export class AbmEnviosComponent {
  crearEnvioForm!: FormGroup;

  @Input() envios: Envio [] = [];

  constructor(private formBuilder: FormBuilder, public enviosService : EnviosService) {
  }

  ngOnInit(): void {
    this.envios = this.enviosService.obtenerEnvios();
    this.crearEnvioForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      precio: ["", [Validators.required, Validators.min(0)]]
    });
  }

  get nombre() { return this.crearEnvioForm.get('nombre'); }

  crear(value: any) {
    if (this.enviosService.crear(value.nombre, value.precio)) {
      alert(`${value.nombre} creado exitosamente`);
    }
    else {
      alert(`No se pudo crear el envío ${value.nombre}`);
    }
  }
}
