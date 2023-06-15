import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoProducto, TipoProductoClass } from '../../models/modelo.tipoProducto';
import { ProductosService } from 'src/app/services/productos.service';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { HttpStatusCode } from '@angular/common/http';
import { FuncionesService } from 'src/app/services/funciones.service';
import { constantes } from 'src/environment/constantes';

@Component({
  selector: 'app-item-tipo-producto',
  templateUrl: './item-tipo-producto.component.html',
  styleUrls: ['./item-tipo-producto.component.css'],
  providers: [ProductosService, FuncionesService]
})

export class ItemTipoProductoComponent {
  readonly constantes = constantes;
  editarItemTipoProductoForm!: FormGroup;
  editando: TipoProducto;

  @Input() tipoProducto: TipoProducto = TipoProductoClass.Nulo;
  @Output() refrescar: EventEmitter<ResultadoApi> = new EventEmitter<ResultadoApi>();

  constructor(private formBuilder: FormBuilder, private productosService: ProductosService, public funcionesService: FuncionesService) {
    this.editando = TipoProductoClass.Nulo;
  }

  ngOnInit(): void {
    this.editarItemTipoProductoForm = this.formBuilder.group({
      nuevoNombre: ["", [Validators.required, Validators.minLength(constantes.MINIMO_NOMBRE_TIPO_ARTICULO), Validators.maxLength(constantes.MAXIMO_NOMBRE_TIPO_ARTICULO)]]
    })
  }

  get nuevoNombre() { return this.editarItemTipoProductoForm.get('nuevoNombre'); }

  editar(tipoProducto: TipoProducto) {
    this.editarItemTipoProductoForm.get("nuevoNombre")?.setValue(tipoProducto.nombre);
    this.editando = tipoProducto;
  }

  borrar(tipoProducto: TipoProducto) {
    this.productosService.borrarTipo(tipoProducto)
      .subscribe((nuevoTipoProducto: TipoProducto) => {
        this.refrescar.emit({ mensaje: "Tipo de artículo borrado exitosamente.", data: {}, status: HttpStatusCode.Ok });
      });
  }

  grabar(tipoProducto: TipoProducto, value: any) {
    this.productosService.modificarTipo(tipoProducto, value.nuevoNombre)
      .subscribe((resultado: TipoProducto) => {
        this.tipoProducto = resultado;
        this.refrescar.emit({ mensaje: "Tipo de artículo modificado exitosamente.", data: {}, status: HttpStatusCode.Ok })
        this.cancelar(resultado);
      });
  }

  cancelar(tipoProducto: TipoProducto) {
    this.editando = TipoProductoClass.Nulo;
  }
}
