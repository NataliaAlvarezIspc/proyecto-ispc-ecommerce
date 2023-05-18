import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoProducto, TipoProductoClass } from '../producto/modelo/modelo.tipoProducto';
import { ProductosService } from 'src/app/productos.service';

@Component({
  selector: 'app-item-tipo-producto',
  templateUrl: './item-tipo-producto.component.html',
  styleUrls: ['./item-tipo-producto.component.css']
})

export class ItemTipoProductoComponent {
  editarItemTipoProductoForm!: FormGroup;
  editando: TipoProducto;

  @Input() tipoProducto: TipoProducto = TipoProductoClass.Nulo;

  constructor(private formBuilder: FormBuilder, private productosService: ProductosService) {
    this.editando = TipoProductoClass.Nulo;
  }

  ngOnInit(): void {
    this.editarItemTipoProductoForm = this.formBuilder.group({
      nuevoNombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]]
    })
  }

  get nuevoNombre() { return this.editarItemTipoProductoForm.get('nuevoNombre'); }

  editar(tipoProducto: TipoProducto) {
    this.editando = tipoProducto;
  }

  borrar(tipoProducto: TipoProducto) {
    if (this.productosService.borrarTipo(tipoProducto)) {
      alert(`Borrando ${tipoProducto.nombre}`);
    }
    else {
      alert(`Error eliminando ${tipoProducto.nombre}`);
    }
  }

  grabar(tipoProducto: TipoProducto, value: any) {
    if (this.productosService.modificarTipo(tipoProducto, value.nuevoNombre)) {
    }

    this.editando = TipoProductoClass.Nulo;
  }

  cancelar(tipoProducto: TipoProducto) {
    this.editando = TipoProductoClass.Nulo;
  }
}
