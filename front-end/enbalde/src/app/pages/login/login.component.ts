import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder, private router: Router, private usuariosService: UsuariosService) {}

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        user: [this.usuario.user, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        password: [this.usuario.password, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],

    });
  }

  get user() { return this.loginForm.get('user'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(value: any) {
    if (this.usuariosService.login(value.user, value.password)) {
      alert('Bienvenid@')
      this.router.navigate(['/']);
    }
    else
      alert('Usuario o clave incorrectos');
  }
}
