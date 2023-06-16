import { Component, Input } from '@angular/core';
import { Envio } from '../../models/modelo.envio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnviosService } from 'src/app/services/envios.service';
import { constantes } from 'src/environment/constantes';

@Component({
  selector: 'app-abm-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.css'],
  providers: [ EnviosService ]
})

export class EnviosComponent {
  readonly constantes = constantes;
  crearEnvioForm!: FormGroup;

  @Input() envios: Envio[];

  constructor(private formBuilder: FormBuilder, public enviosService : EnviosService) {
    this.envios = [];
  }

  ngOnInit(): void {
    this.enviosService.obtenerEnvios().subscribe((envios: Envio[]) => this.envios = envios);
    this.crearEnvioForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(constantes.MINIMO_NOMBRE_ENVIO), Validators.maxLength(constantes.MAXIMO_NOMBRE_ENVIO)]],
      monto: ["", [Validators.required, Validators.min(constantes.MINIMO_MONTO_ENVIO)]]
    });
  }

  get nombre() { return this.crearEnvioForm.get('nombre'); }
  get monto() { return this.crearEnvioForm.get('monto'); }

  crear(value: any) {
    this.enviosService.crear(value.nombre, value.monto)
      .subscribe((envio: Envio) => {
        this.refrescar();
        this.crearEnvioForm.reset();
      })
  }

  refrescar(): void {
    this.enviosService.obtenerEnvios()
      .subscribe((envios: Envio[]) => this.envios = envios);
  }
}
