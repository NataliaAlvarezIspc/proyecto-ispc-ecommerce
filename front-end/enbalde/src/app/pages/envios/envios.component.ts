import { Component, Input } from '@angular/core';
import { Envio } from '../../models/modelo.envio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnviosService } from 'src/app/services/envios.service';

@Component({
  selector: 'app-abm-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.css'],
  providers: [ EnviosService ]
})

export class EnviosComponent {
  crearEnvioForm!: FormGroup;

  @Input() envios: Envio[];

  constructor(private formBuilder: FormBuilder, public enviosService : EnviosService) {
    this.envios = [];
  }

  ngOnInit(): void {
    this.enviosService.obtenerEnvios().subscribe((envios: Envio[]) => this.envios = envios);
    this.crearEnvioForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      precio: ["", [Validators.required, Validators.min(0)]]
    });
  }

  get nombre() { return this.crearEnvioForm.get('nombre'); }
  get precio() { return this.crearEnvioForm.get('precio'); }

  crear(value: any) {
    this.enviosService.crear(value.nombre, value.precio)
      .subscribe((envio: Envio) => {
        this.refrescar();
      })
  }

  refrescar(): void {
    this.enviosService.obtenerEnvios()
      .subscribe((envios: Envio[]) => this.envios = envios);
  }
}
