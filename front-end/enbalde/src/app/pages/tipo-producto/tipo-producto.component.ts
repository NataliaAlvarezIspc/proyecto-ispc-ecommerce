import { Component, Input } from '@angular/core';
import { TipoProducto } from '../producto/modelo/modelo.tipoProducto';
import { ProductosService } from 'src/app/productos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.css'],
  providers: [ ProductosService ]
})

export class TipoProductoComponent {
  crearTipoProductoForm!: FormGroup;

  @Input() tipoProductos: TipoProducto [] = [];

  constructor(private formBuilder: FormBuilder, private productosService: ProductosService) {
  }

  ngOnInit(): void {
    this.tipoProductos = this.productosService.obtenerTipos();
    this.crearTipoProductoForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]]
    })
  }

  get nombre() { return this.crearTipoProductoForm.get('nombre'); }

  editar(tipoProducto: TipoProducto) {
    alert(`Editando ${tipoProducto.nombre} (próximamente)`);
  }

  borrar(tipoProducto: TipoProducto) {
    if (confirm(`Está seguro que desea borrar ${tipoProducto.nombre}?`)) {
      this.productosService.borrarTipo(tipoProducto);
    }
  }

  crear(nombre: string) {
    if (this.productosService.crearTipo(nombre)) {
      alert(`${nombre} creado exitosamente`);
    }
    else {
      alert(`No se pudo crear el tipo de producto ${nombre}`);
    }
  }
}
