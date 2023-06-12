import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.css'],
  providers: [ UsuariosService]
})

export class RestablecerComponent implements OnInit {
  @Input() errores: string[] = [];

  restablecerForm = new FormGroup({
    mail: new FormControl ("", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]),
  })

  resetForm = new FormGroup({
    token: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  ngOnInit(): void {
  }

  get mail() { return this.restablecerForm.get('mail'); }

  get token() { return this.resetForm.get('token'); }

  get password() { return this.resetForm.get('password'); }

  constructor (private usuariosService: UsuariosService, private router: Router, private elementRef: ElementRef) {
  }

  onSubmit(value: any): void {
    this.usuariosService.restablecerClave(value.mail)
      .subscribe(_ => {
        alert('Si su mail se encuentra en nuestra base de datos recibirá un token para cambiar su clave.');
      })
  }

  onReset(value: any) {
    this.usuariosService.cambiarClavePorReset(value.token, value.password)
      .subscribe({
        next: exito => {
          console.log(exito);
          alert('Su clave ha sido cambiada exitosamente. Puede ingresar.');
          this.router.navigate(['/login/']);
          this.elementRef.nativeElement.ownerDocument.documentElement.scrollTop = 0;
        },
        error: (error: any) => {
          if (error["password"]) {
            this.errores = error["password"];
          }
          else if (error["detail"]) {
            this.errores = [ error["detail"] ];
          }

          if (this.errores) {
            setTimeout(() => {
              this.errores = [];
            }, 3000);
          }
        }
      })
  }
}
