import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})

export class AltaProductoComponent {
  formularioAltaProducto = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    tipo: new FormControl(''),
    precio: new FormControl(''),
    costo: new FormControl(''),
    alicuota: new FormControl(''),
    imagen: new FormControl('')
  });
}
