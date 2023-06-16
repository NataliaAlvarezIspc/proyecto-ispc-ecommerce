import { Component, Input } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { Producto } from '../../models/modelo.producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoProducto } from '../../models/modelo.tipoProducto';
import { ProductosService } from 'src/app/services/productos.service';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { FuncionesService } from 'src/app/services/funciones.service';
import { constantes } from 'src/environment/constantes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ProductosService, FuncionesService]

})

export class DashboardComponent {
  readonly constantes = constantes;
  crearProductoForm!: FormGroup;
  @Input() productos: Producto[];
  @Input() tipoProductos: TipoProducto[];
  @Input() resultado?: ResultadoApi;

  constructor(private formBuilder: FormBuilder, private productosService: ProductosService, public funcionesService: FuncionesService) {
    this.resultado = undefined;
    this.productos = [];
    this.tipoProductos = [];
  }

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe((productos: Producto[]) => this.productos = productos);
    this.productosService.obtenerTipos().subscribe((tipoProductos: TipoProducto[]) => { this.tipoProductos = tipoProductos; });

    this.crearProductoForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(constantes.MINIMO_NOMBRE_ARTICULO), Validators.maxLength(constantes.MAXIMO_NOMBRE_ARTICULO)]],
      descripcion: ["", [Validators.required, Validators.minLength(constantes.MINIMA_DESCRIPCION_ARTICULO), Validators.maxLength(constantes.MAXIMA_DESCRIPCION_ARTICULO)]],
      tipo: [0, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(constantes.MINIMO_PRECIO_ARTICULO)]],
      costo: [0, [Validators.required, Validators.min(constantes.MINIMO_COSTO_ARTICULO)]],
      cantidad: [0, [Validators.required, Validators.min(constantes.MINIMA_CANTIDAD_ARTICULO)]],
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
      .subscribe((producto: Producto) => {
        this.refrescar({ mensaje: "Artículo creado con éxito.", data: {}, status: HttpStatusCode.Ok });
        this.crearProductoForm.reset();
      });
  }

  onFileChange(event: any) {
    const archivo = event.target.files?.[0];
    if (archivo) {
      this.crearProductoForm.get("imagen")?.setValue(archivo);
    }
  }

  refrescar(resultado?: ResultadoApi) {
    this.resultado = resultado;
    this.productosService.obtenerProductos()
      .subscribe((productos: Producto[]) => this.productos = productos);
  }

  crearId = this.funcionesService.crearId;
}
