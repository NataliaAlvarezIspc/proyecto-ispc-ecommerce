import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Envio } from '../../models/modelo.envio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnviosService } from 'src/app/services/envios.service';

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
      nuevoNombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      nuevoMonto: ["", [Validators.required, Validators.min(0)]]
    })
  }

  get nuevoNombre() { return this.editarItemEnvioForm.get('nuevoNombre'); }

  get nuevoMonto() { return this.editarItemEnvioForm.get('nuevoMonto'); }

  editar(envio: Envio) {
    this.editando = envio;
  }

  borrar(envio: Envio) {
    this.enviosService.borrar(envio)
      .subscribe((_: any) => this.refrescar.emit());
  }

  grabar(envio: Envio, value: any) {
    if (this.enviosService.modificar(envio, value.nuevoNombre, value.nuevoMonto)) {
    }

    this.editando = undefined;
  }

  cancelar(envio: Envio) {
    this.editando = undefined;
  }
}
