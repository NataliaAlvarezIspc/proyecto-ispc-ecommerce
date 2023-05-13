import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/usuarios.service';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.css'],
  providers: [ UsuariosService]
})
export class RestablecerComponent implements OnInit {
  restablecerForm = new FormGroup({
    mail: new FormControl ("", [Validators.required, Validators.email]),
  })

  ngOnInit(): void {
    
  }

  constructor (private usuariosService: UsuariosService ) {}

  onSubmit(): void {
    if (this.usuariosService.restablecerClave(this.restablecerForm.value.mail))
      alert('Si su mail se encuentra en nuestra base de datos, le será enviada una nueva contraseña');
  }
}

