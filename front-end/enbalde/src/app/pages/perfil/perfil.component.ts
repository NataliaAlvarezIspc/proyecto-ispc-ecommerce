import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/modelo.usuario';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;
  usuario?: Usuario;

  constructor(private formBuilder: FormBuilder, private usuariosService: UsuariosService, private router: Router, private elementRef: ElementRef, private authService: AuthService) {
    this.usuario = {} as Usuario;
    this.perfilForm = this.formBuilder.group({
      mail: ["", [Validators.required, Validators.minLength(5), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
      adress: ["", [Validators.required, Validators.maxLength(40)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      phone: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(25)]]
    })
  }

  ngOnInit(): void {
    this.usuario = this.authService.usuario;
    if (this.usuario) {
      this.perfilForm = this.formBuilder.group({
        mail: [this.usuario.email, [Validators.required, Validators.minLength(5), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
        adress: [this.usuario.direccion, [Validators.required, Validators.maxLength(40)]],
        password: [this.usuario.clave, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        phone: [this.usuario.telefono, [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
      })
    }
  }

  get obtenerUsuario() { return (this.usuario) }
  get mail() { return this.perfilForm.get('mail'); }
  get adress() { return this.perfilForm.get('adress'); }
  get password() { return this.perfilForm.get('password'); }
  get phone() { return this.perfilForm.get('phone'); }

  onSubmit(value: any): void {
    if (this.usuario) {
      if (this.usuariosService.modificar(this.usuario, value.adress, value.mail, value.password, value.phone, this.usuario.observaciones)) {
        alert('Datos actualizados! Volviendo a la página principal');
        this.router.navigate(['/']);
        this.elementRef.nativeElement.ownerDocument.documentElement.scrollTop = 0;
      }
    }
  }
}
