import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, RangeValueAccessor, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenUsuario, UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UsuariosService ]
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usuario = {user: '', password: ''};

  constructor(private fb: FormBuilder, private router: Router, private elementRef: ElementRef, private usuariosService: UsuariosService, private authService: AuthService) {
  }

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        user: [this.usuario.user, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        password: [this.usuario.password, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    });
  }

  get user() { return this.loginForm.get('user'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(value: any) {
    this.authService.login(value.user, value.password)
      .subscribe(resultado => {
        let tokenUsuario = resultado.data as TokenUsuario;

        localStorage.setItem('accessToken', `${tokenUsuario.accessToken.acceso}`);
        localStorage.setItem('usuarioActual', JSON.stringify(tokenUsuario.usuarioActual));
        this.authService.autenticadoComo(tokenUsuario.usuarioActual);
        this.router.navigate(['/']);
        this.elementRef.nativeElement.ownerDocument.documentElement.scrollTop = 0;
      });
  }
}
