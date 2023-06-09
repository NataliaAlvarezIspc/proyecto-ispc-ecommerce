import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { HttpStatusCode } from '@angular/common/http';
import { FuncionesService } from 'src/app/services/funciones.service';
import { Producto, ProductoClass } from 'src/app/models/modelo.producto';
import { TipoProducto } from 'src/app/models/modelo.tipoProducto';
import { constantes } from 'src/environment/constantes';

@Component({
  selector: 'app-item-producto',
  templateUrl: './item-producto.component.html',
  styleUrls: ['./item-producto.component.css'],
  providers: [ProductosService, FuncionesService]
})

export class ItemProductoComponent {
  readonly constantes = constantes;
  editarItemProductoForm!: FormGroup;
  editando: Producto;

  @Input() producto: Producto;
  @Input() tipoProductos: TipoProducto[];
  @Input() odd: boolean;
  @Output() refrescar: EventEmitter<ResultadoApi> = new EventEmitter<ResultadoApi>();

  constructor(private formBuilder: FormBuilder, private productosService: ProductosService, public funcionesService: FuncionesService) {
    this.editando = ProductoClass.Nulo;
    this.producto = ProductoClass.Nulo;
    this.tipoProductos = [];
    this.odd = false;
  }

  ngOnInit(): void {
    this.editarItemProductoForm = this.formBuilder.group({
      nuevoNombre: ["", [Validators.required, Validators.minLength(constantes.MINIMO_NOMBRE_ARTICULO), Validators.maxLength(constantes.MAXIMO_NOMBRE_ARTICULO)]],
      nuevaDescripcion: ["", [Validators.required, Validators.minLength(constantes.MINIMA_DESCRIPCION_ARTICULO), Validators.maxLength(constantes.MAXIMA_DESCRIPCION_ARTICULO)]],
      nuevoTipo: [0, [Validators.required, Validators.min(1)]],
      nuevoPrecio: [0, [Validators.required, Validators.min(constantes.MINIMO_PRECIO_ARTICULO)]],
      nuevoCosto: [0, [Validators.required, Validators.min(constantes.MINIMO_COSTO_ARTICULO)]],
      nuevaCantidad: [0, [Validators.required, Validators.min(constantes.MINIMA_CANTIDAD_ARTICULO)]],
      nuevaImagen: [null]
    });
  }

  editar(producto: Producto) {
    this.editarItemProductoForm.get("nuevoNombre")?.setValue(producto.nombre);
    this.editarItemProductoForm.get("nuevaDescripcion")?.setValue(producto.descripcion);
    this.editarItemProductoForm.get("nuevoTipo")?.setValue(producto.tipo);
    this.editarItemProductoForm.get("nuevoPrecio")?.setValue(producto.precio);
    this.editarItemProductoForm.get("nuevoCosto")?.setValue(producto.costo);
    this.editarItemProductoForm.get("nuevaCantidad")?.setValue(producto.cantidad);
    this.editarItemProductoForm.get("nuevaImagen")?.setValue(producto.imagen);
    this.editando = producto;
  }

  borrar(producto: Producto) {
    this.productosService.borrarProducto(producto)
      .subscribe({
        next: () => { this.refrescar.emit({ mensaje: `${producto.nombre} borrado exitosamente.`, data: {}, status: HttpStatusCode.Ok }) },
        error: () => { this.refrescar.emit({ mensaje: `Error borrando ${producto.nombre}, refresque e intente nuevamente.`, data: {}, status: HttpStatusCode.BadRequest }) },
        complete: () => {}
      });
  }

  grabar(producto: Producto, value: any) {
    this.productosService.modificarProducto(producto, value.nuevoNombre, value.nuevaDescripcion, value.nuevoPrecio, value.nuevoCosto, value.nuevaCantidad, value.nuevaImagen, value.nuevoTipo)
      .subscribe((respuesta: Producto) => {
          this.producto = respuesta;
          this.editando = ProductoClass.Nulo;
          this.refrescar.emit({ mensaje: "Artículo modificado exitosamente", data: {}, status: HttpStatusCode.Ok })
        });
  }

  cancelar(producto: Producto) {
    this.editando = ProductoClass.Nulo;
  }

  onFileChange(event: any) {
    const archivo = event.target.files?.[0];
    if (archivo) {
      this.editarItemProductoForm.get("nuevaImagen")?.setValue(archivo);
    }
  }

  crearId = this.funcionesService.crearId;
}
