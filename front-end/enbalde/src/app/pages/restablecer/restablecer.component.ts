import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.css'],
  providers: [ UsuariosService]
})

export class RestablecerComponent implements OnInit {
  restablecerForm = new FormGroup({
    mail: new FormControl ("", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]),
  })

  ngOnInit(): void {
  }

  get mail() { return this.restablecerForm.get('mail'); }

  constructor (private usuariosService: UsuariosService) {}

  onSubmit(value: any): void {
    if (this.usuariosService.restablecerClave(value.mail))
      alert('Si su mail se encuentra en nuestra base de datos, le será enviada una nueva contraseña');
  }
}
