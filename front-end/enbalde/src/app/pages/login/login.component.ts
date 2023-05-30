import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UsuariosService ]
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usuario = { user: '', password: ''};

  constructor(private fb: FormBuilder, private router: Router, private elementRef: ElementRef, private usuariosService: UsuariosService) {}

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        user: [this.usuario.user, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        password: [this.usuario.password, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],

    });
  }

  get user() { return this.loginForm.get('user'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(value: any) {
    this.usuariosService.login(value.user, value.password).subscribe(p => console.log(p))
    //this.router.navigate(['/']);
    //this.elementRef.nativeElement.ownerDocument.documentElement.scrollTop = 0;
  }
}
