import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private formBuilder: FormBuilder, private router: Router, private usuariosService: UsuariosService, private elementRef: ElementRef, private authService: AuthService) {
  }

  ngOnInit(): void {
    let usuario = this.authService.obtenerUsuarioSiNoExpiro();
    let nombre = usuario?.nombre ?? "";
    let email = usuario?.email ?? "";
    this.contactForm = this.formBuilder.group({
      name: [nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: [email, [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[^,;\s]+(?:.[a-zA-Z0-9-]+)$"), Validators.minLength(10)]],
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
    this.usuariosService.contacto(value.name, value.email, value.reason, value.message);
  }

  get nombre() { return this.contactForm.get('name'); }

  get email() { return this.contactForm.get('email'); }

  get motivo() { return this.contactForm.get('reason'); }

  get mensaje() { return this.contactForm.get('message'); }
}
