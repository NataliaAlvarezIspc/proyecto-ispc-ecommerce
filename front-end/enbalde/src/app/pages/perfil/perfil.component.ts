import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/modelo.usuario';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {
  perfilForm!: FormGroup;
  @Input() usuario!: Usuario;

  constructor(private formBuilder: FormBuilder, private usuariosService: UsuariosService, private router: Router) {
  }

  ngOnInit(): void {
    this.usuariosService.obtenerInformacionUsuario(1)
      .subscribe((usuario: Usuario) => {
        this.usuario = usuario;

        this.perfilForm = this.formBuilder.group({
          mail: [usuario.email, [Validators.required, Validators.minLength(5), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
          adress: [usuario.direccion, [Validators.required, Validators.maxLength(40)]],
          password: [usuario.clave, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
          phone: [usuario.telefono, [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
        })
      })
  }

  get mail() { return this.perfilForm.get('mail'); }
  get adress() { return this.perfilForm.get('adress'); }
  get password() { return this.perfilForm.get('password'); }
  get phone() { return this.perfilForm.get('phone'); }

  onSubmit(value: any): void {
    if (this.usuariosService.modificar(this.usuario, value.adress, value.mail, value.password, value.phone, this.usuario.observaciones)) {
      alert('Datos actualizados! Volviendo a la página principal');
      this.router.navigate(['/']);
    }
  }
}
