import { Component, Input } from '@angular/core';
import { TipoProducto } from '../producto/modelo/modelo.tipoProducto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.css'],
  providers: [ ProductosService ]
})

export class TipoProductoComponent {
  crearTipoProductoForm!: FormGroup;

  @Input() tipoProductos: TipoProducto[] = [];

  constructor(private formBuilder: FormBuilder, private productosService: ProductosService) {
  }

  ngOnInit(): void {
    this.productosService.obtenerTipos().subscribe((tipoProductos: TipoProducto[]) => this.tipoProductos = tipoProductos);
    this.crearTipoProductoForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]]
    });
  }

  get nombre() { return this.crearTipoProductoForm.get('nombre'); }

  crear(nombre: string) {
    if (this.productosService.crearTipo(nombre)) {
      alert(`${nombre} creado exitosamente`);
    }
    else {
      alert(`No se pudo crear el tipo de producto ${nombre}`);
    }
  }
}
