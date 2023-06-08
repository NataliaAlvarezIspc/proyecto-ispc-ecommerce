import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { Producto } from '../../models/modelo.producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoProducto } from '../../models/modelo.tipoProducto';
import { ProductosService } from 'src/app/services/productos.service';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { FuncionesService } from 'src/app/services/funciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ProductosService, FuncionesService]

})

export class DashboardComponent {
  crearProductoForm!: FormGroup;
  mostrarMensajeExitoso: boolean = false;
  @Input() productos: Producto[];
  @Input() tipoProductos: TipoProducto[];
  @Input() resultado: ResultadoApi;

  constructor(private formBuilder: FormBuilder, private changeDetector: ChangeDetectorRef, private productosService: ProductosService, public funcionesService: FuncionesService, private router: Router) {
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
  get nombre() { return this.crearProductoForm.get('nombre'); }
  get descripcion() { return this.crearProductoForm.get('descripcion'); }
  get tipo() { return this.crearProductoForm.get('tipo'); }
  get precio() { return this.crearProductoForm.get('precio'); }
  get costo() { return this.crearProductoForm.get('costo'); }
  get cantidad() { return this.crearProductoForm.get('cantidad'); }

  crear(value: any) {
    let tipoProducto: TipoProducto = this.tipoProductos.filter(tp => tp.id == value.tipo)[0];
    this.productosService.crearProducto(value.nombre, value.descripcion, value.precio, value.cantidad, value.costo, value.imagen, tipoProducto)
      .subscribe({
        next: (exito: ResultadoApi) => {
          this.resultado = exito;
          this.refrescar();
           this.mostrarMensajeExitoso = true;
           setTimeout(() => {
             this.mostrarMensajeExitoso = false;
           }, 3000);
           this.crearProductoForm.reset();
        },
        error: (error: ResultadoApi) => { this.resultado = error; },
        complete: () => {}
      });
  }

  onFileChange(event: any) {
    const archivo = event.target.files?.[0];
    if (archivo) {
      this.crearProductoForm.get("imagen")?.setValue(archivo);
    }
  }

  refrescar() {
    this.productosService.obtenerProductos()
      .subscribe((productos: Producto[]) => this.productos = productos);
  }
}
