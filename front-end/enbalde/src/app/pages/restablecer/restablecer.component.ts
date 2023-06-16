import { Component, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.css'],
  providers: [ UsuariosService]
})

export class RestablecerComponent {
  restablecerForm: FormGroup;
  resetForm: FormGroup;
  @Input() errores: string[] = [];
  @Input() resultadoEnviar?: ResultadoApi;
  @Input() resultadoCambiar?: ResultadoApi;

  constructor (private usuariosService: UsuariosService, private router: Router, private elementRef: ElementRef) {
    this.resultadoCambiar = undefined;
    this.resultadoEnviar = undefined;

    this.restablecerForm = new FormGroup({
      mail: new FormControl ("", [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    })

    this.resetForm = new FormGroup({
      token: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })
  }

  get mail() { return this.restablecerForm.get('mail'); }

  get token() { return this.resetForm.get('token'); }

  get password() { return this.resetForm.get('password'); }

  onSubmit(value: any): void {
    this.usuariosService.restablecerClave(value.mail)
      .subscribe({
        next: () => this.resultadoEnviar = { mensaje: "Hemos enviado un correo electrónico con un token a su cuenta de correo.", data: {}, status: HttpStatusCode.Ok },
        error: (error: any) => this.resultadoEnviar = { mensaje: "Error", data: error.error, status: error.status }
      });
  }

  onReset(value: any) {
    this.usuariosService.cambiarClavePorReset(value.token, value.password)
      .subscribe({
        next: () => this.resultadoCambiar = { mensaje: "Su clave ha sido cambiada exitosamente.", data: {}, status: HttpStatusCode.Ok },
        error: (error: any) => this.resultadoCambiar = { mensaje: "Error", data: error.error, status: error.status }
      })
  }
}
