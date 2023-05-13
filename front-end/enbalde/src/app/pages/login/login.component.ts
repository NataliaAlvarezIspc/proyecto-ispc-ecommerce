import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UsuariosService ]
})

export class LoginComponent {
  loginForm = this.fb.group({
    user: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    password: ["",[Validators.required, Validators.minLength(6), Validators.maxLength(20)]],

  })
  onSubmit() {
    
    if (this.usuariosService.login(this.loginForm.value.user, this.loginForm.value.password))
      alert('Bienvenid@s')
        else
          alert('Usuario o clave incorrectos');
  }

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService) {}
}
