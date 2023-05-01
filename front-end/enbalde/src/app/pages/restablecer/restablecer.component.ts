import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.css']
})
export class RestablecerComponent {
  restablecerForm = new FormGroup({
    mail: new FormControl ("", [Validators.required, Validators.email]),
  })

  onSubmit() {
    console.warn(this.restablecerForm.value);
  }
}

