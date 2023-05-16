import { Component, Input } from '@angular/core';
import { Envio, EnvioClass } from '../abm-envios/modelo/modelo.envio';
import { EnviosService } from 'src/app/envios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-envio',
  templateUrl: './item-envio.component.html',
  styleUrls: ['./item-envio.component.css']
})

export class ItemEnvioComponent {
  editarItemEnvioForm!: FormGroup;
  editando: Envio

  constructor(private formBuilder: FormBuilder, private enviosService: EnviosService) {
    this.editando = EnvioClass.Nulo;
  }

  ngOnInit(): void {
    this.editarItemEnvioForm = this.formBuilder.group({
      nuevoNombre: ["", [Validators.minLength(1), Validators.maxLength(40)]],
      nuevoCosto: ["", [Validators.min(0)]]
    })
  }

  @Input() envio: Envio = EnvioClass.Nulo;

  editar(envio: Envio) {
    this.editando = envio;
  }

  borrar(envio: Envio) {
    if (this.enviosService.borrar(envio)) {
      alert(`Borrando ${envio.nombre}`);
    }
    else
    {
      alert(`Error eliminando ${envio.nombre}`)
    }
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
