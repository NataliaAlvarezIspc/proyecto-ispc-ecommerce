import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Envio } from '../../models/modelo.envio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnviosService } from 'src/app/services/envios.service';
import { constantes } from 'src/environment/constantes';

@Component({
  selector: 'app-item-envio',
  templateUrl: './item-envio.component.html',
  styleUrls: ['./item-envio.component.css']
})

export class ItemEnvioComponent {
  editarItemEnvioForm!: FormGroup;
  editando?: Envio

  @Input() envio?: Envio;
  @Output() refrescar: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private enviosService: EnviosService) {
    this.editando = undefined;
    this.envio = undefined;
  }

  ngOnInit(): void {
    this.editarItemEnvioForm = this.formBuilder.group({
      nuevoNombre: ["", [Validators.required, Validators.minLength(constantes.MINIMO_NOMBRE_ENVIO), Validators.maxLength(constantes.MAXIMO_NOMBRE_ENVIO)]],
      nuevoMonto: ["", [Validators.required, Validators.min(constantes.MINIMO_MONTO_ENVIO)]]
    })
  }

  get nuevoNombre() { return this.editarItemEnvioForm.get('nuevoNombre'); }

  get nuevoMonto() { return this.editarItemEnvioForm.get('nuevoMonto'); }

  editar(envio: Envio) {
    this.editarItemEnvioForm.get("nuevoNombre")?.setValue(envio.nombre);
    this.editarItemEnvioForm.get("nuevoMonto")?.setValue(envio.monto);
    this.editando = envio;
  }

  borrar(envio: Envio) {
    this.enviosService.borrar(envio)
      .subscribe((_: any) => this.refrescar.emit());
  }

  grabar(envio: Envio, value: any) {
    this.enviosService.modificar(envio, value.nuevoNombre, value.nuevoMonto)
      .subscribe((nuevaEnvio: Envio) => {
        this.editando = undefined;
        this.refrescar.emit();
    });
  }

  cancelar(envio: Envio) {
    this.editando = undefined;
  }
}
