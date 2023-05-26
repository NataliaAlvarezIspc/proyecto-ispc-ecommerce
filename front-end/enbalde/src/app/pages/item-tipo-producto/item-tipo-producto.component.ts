import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoProducto, TipoProductoClass } from '../../models/modelo.tipoProducto';
import { ProductosService } from 'src/app/services/productos.service';
import { ResultadoApi } from 'src/app/models/modelo.resultado';

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
    let nuevoNombre = this.editarItemTipoProductoForm.value.nuevoNombre;
    this.productosService.modificarTipo(tipoProducto, nuevoNombre)
      .subscribe({
        next: (exito: ResultadoApi) => { this.editando = exito.data as TipoProducto; },
        error: (error: ResultadoApi) => {  },
        complete: () => {}
      });
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

  crearId = (id: number) => `id-${id}`;

  extraerId = (id: string) => parseInt(id.split("-")[1]);
}
