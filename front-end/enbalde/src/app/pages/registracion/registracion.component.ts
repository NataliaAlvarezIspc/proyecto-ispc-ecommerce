import { HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { TipoUsuario } from 'src/app/models/modelo.usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registracion',
  templateUrl: './registracion.component.html',
  styleUrls: ['./registracion.component.css'],
  providers: [UsuariosService]
})

export class RegistracionComponent implements OnInit {
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
      fname: [this.usuarios.fname, [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      lname: [this.usuarios.lname, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      mail: [this.usuarios.mail, [Validators.required, Validators.minLength(10), Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), Validators.maxLength(45)]],
      adress: [this.usuarios.adress, [Validators.required, Validators.maxLength(40)]],
      user: [this.usuarios.user, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: [this.usuarios.password, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      phone: [this.usuarios.phone, [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
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
