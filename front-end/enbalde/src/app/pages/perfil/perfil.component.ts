import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {
  perfilForm!: FormGroup;
  perfil!: { mail: ''; adress: ''; password: ''; phone: ''; };
  mensaje: string = '';

  constructor(private fb: FormBuilder) {
  }

  fname: string = 'Natalia';
  lname: string = 'García';
  mailB: string = 'nataliagarcia@gmail.com';
  adressB: string = 'Av. Siempre Viva 2233';
  user: string = 'Natalia';
  passwordB: string = '123456';
  phoneB: string = '112222222';

  ngOnInit(): void {
//    this.obtenerPerfil();
//    this.crearFormulario();
      this.perfilForm = this.fb.group ({
        mail: [this.perfil.mail, [Validators.required, Validators.minLength(10), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
        adress: [this.perfil.adress, [Validators.required, Validators.maxLength(40)]],
        password: [this.perfil.password, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        phone: [this.perfil.phone, [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
        });
  }
//  obtenerPerfil() {
 //   this.perfilService.obtenerPerfil().suscribe(
//      (data) => {
//       this.perfil = data;
//      },
//      (error) => {
//        console.error(error);
//      }
//    );
//  }

//  crearFormulario(): void {
//    this.perfilForm = this.fb.group ({
//      mail: [this.perfil.mail, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
//      password: [this.perfil.password, Validators.required],
//      adress: [this.perfil.adress, Validators.required],
//      phone: [this.perfil.phone, Validators.required],
//
//    })
// }
  get mail() { return this.perfilForm.get('mail'); }
  get adress() { return this.perfilForm.get('adress'); }
  get password() { return this.perfilForm.get('password'); }
  get phone() { return this.perfilForm.get('phone'); }

  onSubmit(): void {
  //  if (this.perfilForm.valid) {
  //    this.perfilService.actualizarPerfil(this.perfilForm.value).suscribe(
  //      (data) => {
  //        this.perfil = data;
  //        this.mensaje = 'Los cambios han sido guardados correctamente.';
  //      },
  //      (error) => {
  //        console.error(error);
  //      }
  //    );
  //  }
  }
}

