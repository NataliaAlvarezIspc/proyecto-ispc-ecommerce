import { HttpStatusCode } from '@angular/common/http';
import { Component, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { AuthService } from 'src/app/services/auth.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  providers: [ UsuariosService ]
})

export class ContactoComponent {
  contactForm!: FormGroup;
  @Input() resultado?: ResultadoApi;

  constructor(private formBuilder: FormBuilder, private router: Router, private usuariosService: UsuariosService, private elementRef: ElementRef, private authService: AuthService) {
    this.resultado = undefined;
  }

  ngOnInit(): void {
    let usuario = this.authService.obtenerUsuarioSiNoExpiro();
    let nombre = usuario?.nombre ?? "";
    let email = usuario?.email ?? "";
    this.contactForm = this.formBuilder.group({
      name: [nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: [email, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), Validators.minLength(10)]],
      reason: ["", [Validators.required]],
      message: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(255)]]
    })
  }

  onSubmit(value: any) {
    // if (this.usuariosService.contacto(value.name, value.email, value.reason, value.message)) {
    //   alert('Mensaje enviado con éxito, volviendo a la página principal');
    //   this.router.navigate(['/']);
    //   this.elementRef.nativeElement.ownerDocument.documentElement.scrollTop = 0;
    // }
    this.usuariosService.contacto(value.name, value.email, value.reason, value.message)
      .subscribe({
        next: () => this.resultado = { mensaje: "Mensaje enviado con éxito!", data: {}, status: HttpStatusCode.Ok },
        error: () => this.resultado = { mensaje: "Error al enviar mensaje", data: {}, status: HttpStatusCode.BadRequest }
      })
  }

  get nombre() { return this.contactForm.get('name'); }

  get email() { return this.contactForm.get('email'); }

  get motivo() { return this.contactForm.get('reason'); }

  get mensaje() { return this.contactForm.get('message'); }
}
