import { HttpStatusCode } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { TipoUsuario } from 'src/app/models/modelo.usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { constantes } from 'src/environment/constantes';

@Component({
  selector: 'app-registracion',
  templateUrl: './registracion.component.html',
  styleUrls: ['./registracion.component.css'],
  providers: [UsuariosService]
})

export class RegistracionComponent {
  readonly constantes = constantes;
  registrarForm!: FormGroup
  usuarios = { fname: '', lname: '', mail: '', adress: '', user: '', password: '', phone: '' }

  @Input() resultado: ResultadoApi;

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService) {
    this.resultado = {
      mensaje: "",
      data: {},
      status: 0 as HttpStatusCode
    }
  }

  ngOnInit(): void {
    this.registrarForm = this.fb.group({
      fname: [this.usuarios.fname, [Validators.required, Validators.minLength(constantes.MINIMO_NOMBRE_USUARIO), Validators.maxLength(constantes.MAXIMO_NOMBRE_USUARIO)]],
      lname: [this.usuarios.lname, [Validators.required, Validators.minLength(constantes.MINIMO_APELLIDO_USUARIO), Validators.maxLength(constantes.MAXIMO_APELLIDO_USUARIO)]],
      mail: [this.usuarios.mail, [Validators.required, Validators.minLength(constantes.MINIMO_EMAIL_USUARIO), Validators.maxLength(constantes.MAXIMO_EMAIL_USUARIO), Validators.pattern(constantes.PATRON_EMAIL)]],
      adress: [this.usuarios.adress, [Validators.required, Validators.maxLength(constantes.MAXIMA_DIRECCION_USUARIO)]],
      user: [this.usuarios.user, [Validators.required, Validators.minLength(constantes.MINIMO_USUARIO_USUARIO), Validators.maxLength(constantes.MAXIMO_USUARIO_USUARIO)]],
      password: [this.usuarios.password, [Validators.required, Validators.minLength(constantes.MINIMA_CLAVE_USUARIO), Validators.maxLength(constantes.MAXIMA_CLAVE_USUARIO)]],
      phone: [this.usuarios.phone, [Validators.required, Validators.minLength(constantes.MINIMO_TELEFONO_USUARIO), Validators.maxLength(constantes.MAXIMO_TELEFONO_USUARIO)]],
    });
  }

  get fname() { return this.registrarForm.get('fname'); }
  get lname() { return this.registrarForm.get('lname'); }
  get mail() { return this.registrarForm.get('mail'); }
  get adress() { return this.registrarForm.get('adress'); }
  get user() { return this.registrarForm.get('user'); }
  get password() { return this.registrarForm.get('password'); }
  get phone() { return this.registrarForm.get('phone'); }

  onSubmit(value: any) {
    this.usuariosService.registrar(value.fname, value.lname, value.mail, value.adress, value.user, value.password, value.phone, TipoUsuario.Cliente)
      .subscribe({
        next: (exito: ResultadoApi) => { this.resultado = exito;  this.registrarForm.reset();},
        error: (error: ResultadoApi) => { this.resultado = error; },
        complete: () => {}
      });
  }
}
