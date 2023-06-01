import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { HttpStatusCode } from '@angular/common/http';
import { FuncionesService } from 'src/app/services/funciones.service';
import { Producto, ProductoClass } from 'src/app/models/modelo.producto';
import { TipoProducto } from 'src/app/models/modelo.tipoProducto';

@Component({
  selector: 'app-item-producto',
  templateUrl: './item-producto.component.html',
  styleUrls: ['./item-producto.component.css'],
  providers: [ProductosService, FuncionesService]
})

export class ItemProductoComponent {
  editarItemProductoForm!: FormGroup;
  editando: Producto;

  @Input() producto: Producto;
  @Input() tipoProductos: TipoProducto[];
  @Input() resultado: ResultadoApi;
  @Output() refrescar: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private productosService: ProductosService, public funcionesService: FuncionesService) {
    this.editando = ProductoClass.Nulo;
    this.producto = ProductoClass.Nulo;
    this.tipoProductos = [];
    this.resultado = {
      mensaje: "",
      data: {},
      status: 0 as HttpStatusCode
    };
  }

  ngOnInit(): void {
    this.editarItemProductoForm = this.formBuilder.group({
      nuevoNombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      nuevaDescripcion: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      nuevoTipo: [0, [Validators.required, Validators.min(1)]],
      nuevoPrecio: [0, [Validators.required, Validators.min(0)]],
      nuevoCosto: [0, [Validators.required, Validators.min(0)]],
      nuevaCantidad: [0, [Validators.required, Validators.min(0)]],
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
        next: (exito: ResultadoApi) => { this.resultado = exito; this.refrescar.emit(); },
        error: (error: ResultadoApi) => { this.resultado = error; },
        complete: () => {}
      });
  }

  grabar(producto: Producto, value: any) {
    this.productosService.modificarProducto(producto, value.nuevoNombre, value.nuevaDescripcion, value.nuevoPrecio, value.nuevoCosto, value.nuevaCantidad, value.nuevaImagen, value.nuevoTipo)
      .subscribe((respuesta: Producto) => {
          this.resultado = {
            mensaje: "Artículo modificado exitosamente",
            data: respuesta,
            status: HttpStatusCode.Ok
          };
          this.producto = respuesta;
          this.editando = ProductoClass.Nulo;
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
}
