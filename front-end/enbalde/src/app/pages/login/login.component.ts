import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UsuariosService ]
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  
  usuario = { user: '', password: ''};

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService) {}
  
  ngOnInit(): void {
      this.loginForm = this.fb.group({
        user: [this.usuario.user, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        password: [this.usuario.password, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
  
    });
  }

  get user() { return this.loginForm.get('user'); }
  get password() { return this.loginForm.get('password'); }
  
  onSubmit() {
    
    if (this.usuariosService.login(this.loginForm.value.user, this.loginForm.value.password))
      alert('Bienvenid@s')
        else
          alert('Usuario o clave incorrectos');
  }

  

  
}
