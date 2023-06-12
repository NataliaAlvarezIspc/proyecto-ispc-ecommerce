import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Envio, EnvioClass } from '../../models/modelo.envio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnviosService } from 'src/app/services/envios.service';

@Component({
  selector: 'app-item-envio',
  templateUrl: './item-envio.component.html',
  styleUrls: ['./item-envio.component.css']
})

export class ItemEnvioComponent {
  editarItemEnvioForm!: FormGroup;
  editando: Envio

  @Input() envio: Envio;
  @Output() refrescar: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private enviosService: EnviosService) {
    this.editando = EnvioClass.Nulo;
    this.envio = EnvioClass.Nulo;
  }

  ngOnInit(): void {
    this.editarItemEnvioForm = this.formBuilder.group({
      nuevoNombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      nuevoCosto: ["", [Validators.required, Validators.min(0)]]
    })
  }

  get nuevoNombre() { return this.editarItemEnvioForm.get('nuevoNombre'); }

  get nuevoCosto() { return this.editarItemEnvioForm.get('nuevoCosto'); }

  editar(envio: Envio) {
    this.editando = envio;
  }

  borrar(envio: Envio) {
    this.enviosService.borrar(envio)
      .subscribe((_: any) => this.refrescar.emit());
  }

  grabar(envio: Envio, value: any) {
    if (this.enviosService.modificar(envio, value.nuevoNombre, value.nuevoCosto)) {
    }

    this.editando = EnvioClass.Nulo;
  }

  cancelar(envio: Envio) {
    this.editando = EnvioClass.Nulo;
  }
}
