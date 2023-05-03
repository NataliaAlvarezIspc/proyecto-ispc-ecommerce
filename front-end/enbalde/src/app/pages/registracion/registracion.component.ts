import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-registracion',
  templateUrl: './registracion.component.html',
  styleUrls: ['./registracion.component.css']
})
export class RegistracionComponent {
  registrarForm = new FormGroup({
    name: new FormControl(''),
    lname: new FormControl(''),
    mail: new FormControl(''),
    adress: new FormControl(''),
    user: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl('')
    
  });

  updateProfile() {
    this.registrarForm.patchValue({
      name: '',
      lname: '',
      adress: '',
      phone: ''
    });
  }

}
