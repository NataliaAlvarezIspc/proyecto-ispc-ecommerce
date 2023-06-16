import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { constantes } from 'src/environment/constantes';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  providers: [ UsuariosService ]
})

export class ContactoComponent {
  readonly constantes = constantes;
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private usuariosService: UsuariosService, private elementRef: ElementRef, private authService: AuthService) {
  }

  ngOnInit(): void {
    let usuario = this.authService.obtenerUsuarioSiNoExpiro();
    let nombre = usuario?.nombre ?? "";
    let email = usuario?.email ?? "";
    this.contactForm = this.formBuilder.group({
      name: [nombre, [Validators.required, Validators.minLength(constantes.MINIMO_NOMBRE_USUARIO), Validators.maxLength(constantes.MAXIMO_NOMBRE_USUARIO)]],
      email: [email, [Validators.required, Validators.pattern(constantes.PATRON_EMAIL), Validators.minLength(constantes.MINIMO_EMAIL_USUARIO)]],
      reason: ["", [Validators.required]],
      message: ["", [Validators.required, Validators.minLength(constantes.MINIMO_MENSAJE_CONTACTO), Validators.maxLength(constantes.MAXIMO_MENSAJE_CONTACTO)]]
    })
  }

  onSubmit(value: any) {
    this.usuariosService.contacto(value.name, value.email, value.reason, value.message)
  }

  get nombre() { return this.contactForm.get('name'); }

  get email() { return this.contactForm.get('email'); }

  get motivo() { return this.contactForm.get('reason'); }

  get mensaje() { return this.contactForm.get('message'); }
}
