import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/modelo.usuario';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';
import { constantes } from 'src/environment/constantes';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {
  readonly constantes = constantes;
  perfilForm: FormGroup;
  usuario?: Usuario;

  constructor(private formBuilder: FormBuilder, private usuariosService: UsuariosService, private router: Router, private elementRef: ElementRef, private authService: AuthService) {
    this.usuario = {} as Usuario;
    this.perfilForm = this.formBuilder.group({
      mail: ["", [Validators.required, Validators.minLength(constantes.MINIMO_EMAIL_USUARIO), Validators.pattern(constantes.PATRON_EMAIL)]],
      adress: ["", [Validators.required, Validators.maxLength(constantes.MAXIMA_DIRECCION_USUARIO)]],
      password: ["", [Validators.required, Validators.minLength(constantes.MINIMA_CLAVE_USUARIO), Validators.maxLength(constantes.MAXIMA_CLAVE_USUARIO)]],
      phone: ["", [Validators.required, Validators.minLength(constantes.MINIMO_TELEFONO_USUARIO), Validators.maxLength(constantes.MAXIMO_TELEFONO_USUARIO)]]
    })
  }

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuarioSiNoExpiro();
    if (this.usuario) {
      this.perfilForm.get("mail")?.setValue(this.usuario.email);
      this.perfilForm.get("adress")?.setValue(this.usuario.direccion);
      this.perfilForm.get("password")?.setValue(this.usuario.clave);
      this.perfilForm.get("phone")?.setValue(this.usuario.telefono);
    }
  }

  get mail() { return this.perfilForm.get('mail'); }
  get adress() { return this.perfilForm.get('adress'); }
  get password() { return this.perfilForm.get('password'); }
  get phone() { return this.perfilForm.get('phone'); }

  onSubmit(value: any): void {
    if (this.usuario) {
      this.usuariosService.modificar(this.usuario, value.adress, value.mail, value.password, value.phone, this.usuario.observaciones).subscribe({
        next: (usuarioNuevo:Usuario) => {
          if (usuarioNuevo) {
            this.authService.autenticadoComo (usuarioNuevo);
            this.usuario = usuarioNuevo

          } else{
            alert('Los datos no han sido actualizados')
          }
        },
        error: (error:any) => {
          alert('Error al cargar los datos')
        }
      })
    }
  }
}
