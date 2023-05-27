import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { Producto } from '../../models/modelo.producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoProducto } from '../../models/modelo.tipoProducto';
import { ProductosService } from 'src/app/services/productos.service';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ProductosService, FuncionesService]

})

export class DashboardComponent {
  crearProductoForm!: FormGroup;

  @Input() productos: Producto[];
  @Input() tipoProductos: TipoProducto[];
  @Input() resultado: ResultadoApi;

  constructor(private formBuilder: FormBuilder, private changeDetector: ChangeDetectorRef, private productosService: ProductosService, public funcionesService: FuncionesService) {
    this.resultado = {
      mensaje: "",
      data: {},
      status: 0 as HttpStatusCode
    };

    this.productos = [];
    this.tipoProductos = [];
  }

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe((productos: Producto[]) => this.productos = productos);
    this.productosService.obtenerTipos().subscribe((tipoProductos: TipoProducto[]) => { this.tipoProductos = tipoProductos; });

    this.crearProductoForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      descripcion: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      tipo: [0, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      costo: [0, [Validators.required, Validators.min(0)]],
      cantidad: [0, [Validators.required, Validators.min(0)]],
      imagen: [null]
    });
  }

  crear(value: any) {
    let tipoProducto: TipoProducto = this.tipoProductos.filter(tp => tp.id == value.tipo)[0];
    this.productosService.crearProducto(value.nombre, value.descripcion, value.precio, value.cantidad, value.costo, value.imagen, tipoProducto)
      .subscribe({
        next: (exito: ResultadoApi) => { this.resultado = exito; },
        error: (error: ResultadoApi) => { this.resultado = error; },
        complete: () => {}
      });
  }

  editar(producto: Producto) {
    alert(`Editando ${producto.nombre} (próximamente)`);
  }

  borrar(producto: Producto) {
    if (this.productosService.borrarProducto(producto)) {
      alert(`${producto.nombre} borrado correctamente`);
    }
    else {
      alert(`Error borrando ${producto.nombre}`);
    }
  }

  onFileChange(event: any) {
    const archivo = event.target.files?.[0];
    if (archivo) {
      this.crearProductoForm.get("imagen")?.setValue(archivo);
    }
  }
}
