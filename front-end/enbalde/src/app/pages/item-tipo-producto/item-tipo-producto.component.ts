import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoProducto, TipoProductoClass } from '../../models/modelo.tipoProducto';
import { ProductosService } from 'src/app/services/productos.service';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { HttpStatusCode } from '@angular/common/http';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-item-tipo-producto',
  templateUrl: './item-tipo-producto.component.html',
  styleUrls: ['./item-tipo-producto.component.css'],
  providers: [ProductosService, FuncionesService]
})

export class ItemTipoProductoComponent {
  editarItemTipoProductoForm!: FormGroup;
  editando: TipoProducto;

  @Input() tipoProducto: TipoProducto = TipoProductoClass.Nulo;
  @Input() resultado: ResultadoApi;
  @Output() refrescar: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private productosService: ProductosService, public funcionesService: FuncionesService) {
    this.editando = TipoProductoClass.Nulo;
    this.resultado = {
      mensaje: "",
      data: {},
      status: 0 as HttpStatusCode
    };
  }

  ngOnInit(): void {
    this.editarItemTipoProductoForm = this.formBuilder.group({
      nuevoNombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]]
    })
  }

  get nuevoNombre() { return this.editarItemTipoProductoForm.get('nuevoNombre'); }

  editar(tipoProducto: TipoProducto) {
    this.editarItemTipoProductoForm.get("nuevoNombre")?.setValue(tipoProducto.nombre);
    this.editando = tipoProducto;
  }

  borrar(tipoProducto: TipoProducto) {
    this.productosService.borrarTipo(tipoProducto)
      .subscribe({
        next: (exito: ResultadoApi) => { this.resultado = exito; this.refrescar.emit(); },
        error: (error: ResultadoApi) => { this.resultado = error; },
        complete: () => {}
      });
  }

  grabar(tipoProducto: TipoProducto, value: any) {
    this.productosService.modificarTipo(tipoProducto, value.nuevoNombre)
      .subscribe({
        next: (exito: ResultadoApi) => { this.resultado = exito; this.tipoProducto = exito.data as TipoProducto; this.editando = TipoProductoClass.Nulo; },
        error: (error: ResultadoApi) => { this.resultado = error; this.editando = TipoProductoClass.Nulo; },
        complete: () => {}
      });
  }

  cancelar(tipoProducto: TipoProducto) {
    this.editando = TipoProductoClass.Nulo;
  }
}
