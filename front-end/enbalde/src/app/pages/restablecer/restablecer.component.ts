import { Component, OnInit, ElementRef } from '@angular/core';
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
  restablecerForm = new FormGroup({
    mail: new FormControl ("", [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
  })

  ngOnInit(): void {
  }

  get mail() { return this.restablecerForm.get('mail'); }

  constructor (private usuariosService: UsuariosService, private router: Router, private elementRef: ElementRef) {}

  onSubmit(value: any): void {
    if (this.usuariosService.restablecerClave(value.mail))
      alert('Si su mail se encuentra en nuestra base de datos, le será enviada una nueva contraseña');
      this.router.navigate(['/']);
      this.elementRef.nativeElement.ownerDocument.documentElement.scrollTop = 0;
  }
}
