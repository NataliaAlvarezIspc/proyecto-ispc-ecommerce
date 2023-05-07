import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  loginForm = this.fb.group({
    user: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    password: ["",[Validators.required, Validators.minLength(6), Validators.maxLength(20)]],

  })
  onSubmit() {
    console.warn(this.loginForm.value);
  }

  constructor(private fb: FormBuilder) {}
}
