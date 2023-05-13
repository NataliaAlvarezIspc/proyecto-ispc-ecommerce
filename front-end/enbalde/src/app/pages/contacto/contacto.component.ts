import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/usuarios.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  providers: [ UsuariosService ]
})

export class ContactoComponent {
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private usuariosService: UsuariosService) {
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(25)]],
      email: ["", [Validators.required, Validators.email]],
      reason: ["", [Validators.required]],
      message: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(255)]]
    })
  }

  onSubmit(value: any) {
    this.usuariosService.contacto(value.name, value.email, value.reason, value.message);
  }
}
