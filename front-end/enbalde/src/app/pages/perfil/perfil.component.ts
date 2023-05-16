import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
 
  fname: string = 'Natalia';
  lname: string = 'García';
  mail: string = 'nataliagarcia@gmail.com';
  adress: string = 'Av. Siempre Viva 2233';
  user: string = 'Natalia';
  password: string = '123456';
  phone: string = '112222222';
  
  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit() {
    this.router.navigate(['/']);
  }

}

