import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})

export class ContactoComponent {
  contactForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    reason: new FormControl(''),
    message: new FormControl('')
  });
}
