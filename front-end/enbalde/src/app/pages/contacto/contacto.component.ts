import { HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { constantes } from 'src/environment/constantes';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  providers: [UsuariosService]
})

export class ContactoComponent {
  readonly constantes = constantes;
  contactForm!: FormGroup;
  @Input() resultado?: ResultadoApi;

  constructor(private formBuilder: FormBuilder, private usuariosService: UsuariosService, private authService: AuthService) {
    this.resultado = undefined;
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
      .subscribe({
        next: () => {
          this.resultado = { mensaje: "Mensaje enviado con éxito!", data: {}, status: HttpStatusCode.Ok };
          this.contactForm.reset();
        },
        error: () => this.resultado = { mensaje: "Error al enviar mensaje", data: {}, status: HttpStatusCode.BadRequest }
      })
  }

  get nombre() { return this.contactForm.get('name'); }

  get email() { return this.contactForm.get('email'); }

  get motivo() { return this.contactForm.get('reason'); }

  get mensaje() { return this.contactForm.get('message'); }
}
