import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UsuariosService ]
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usuario;
  @Input() resultado: ResultadoApi | undefined;

  constructor(private fb: FormBuilder, private router: Router, private elementRef: ElementRef, private authService: AuthService) {
    this.usuario = { user: "", password:"" };
    this.resultado = undefined;
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
      .subscribe({
        next: (exito: ResultadoApi) => {
          this.resultado = undefined;
          this.router.navigate(['/']);
          this.elementRef.nativeElement.ownerDocument.documentElement.scrollTop = 0;
        },
        error: (error: ResultadoApi) => {
          this.resultado = error;
        },
        complete: () => {}
      });
  }
}
