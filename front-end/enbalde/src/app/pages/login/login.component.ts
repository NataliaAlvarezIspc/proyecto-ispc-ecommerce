import { HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { constantes } from 'src/environment/constantes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuariosService]
})

export class LoginComponent {
  readonly constantes = constantes;
  loginForm!: FormGroup;
  usuario;
  @Input() resultado: ResultadoApi | undefined;

  constructor(private fb: FormBuilder, private router: Router, private elementRef: ElementRef, private authService: AuthService, private activatedRoute: ActivatedRoute) {
    this.usuario = { user: "", password:"" };
    this.resultado = undefined;

    activatedRoute.queryParams
      .subscribe(params => {
        if (params['expirado']) {
          this.resultado = { mensaje: "La sesión ha expirado.", data: { "Expiración": "Por favor vuelva a ingresar." }, status: HttpStatusCode.BadRequest };
        }
      });
  }

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        user: [this.usuario.user, [Validators.required, Validators.minLength(constantes.MINIMO_USUARIO_USUARIO), Validators.maxLength(constantes.MAXIMO_USUARIO_USUARIO)]],
        password: [this.usuario.password, [Validators.required, Validators.minLength(constantes.MINIMA_CLAVE_USUARIO), Validators.maxLength(constantes.MAXIMA_CLAVE_USUARIO)]],
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
