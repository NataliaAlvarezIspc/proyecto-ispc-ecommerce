import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-registracion',
  templateUrl: './registracion.component.html',
  styleUrls: ['./registracion.component.css']
})

export class RegistracionComponent implements OnInit {

  registrarForm = this.fb.group({
    fname:['',[Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
    lname: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    mail: ['', [Validators.required, Validators.minLength(10), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'), Validators.maxLength(45)]],
    adress: ['', [Validators.required, Validators.maxLength(40)]],
    user: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    phone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
  });

  updateProfile(): void {
    this.registrarForm.patchValue({
      fname: '',
      lname: '',
      adress: '',
      phone: ''
    });
  }

  constructor (private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSave() {
    console.log('Form->' + JSON.stringify(this.registrarForm.value));
  }

}
