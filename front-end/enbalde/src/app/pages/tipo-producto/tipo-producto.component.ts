import { Component, Input } from '@angular/core';
import { TipoProducto } from '../../models/modelo.tipoProducto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { HttpStatusCode } from '@angular/common/http';
import { constantes } from 'src/environment/constantes';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.css'],
  providers: [ ProductosService ]
})

export class TipoProductoComponent {
  crearTipoProductoForm!: FormGroup;
  readonly constantes = constantes;
  @Input() tipoProductos: TipoProducto[];
  @Input() resultado?: ResultadoApi;

  constructor(private formBuilder: FormBuilder, private productosService: ProductosService) {
    this.tipoProductos = [];
    this.resultado = undefined;
  }

  ngOnInit(): void {
    this.refrescar();
    this.crearTipoProductoForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(constantes.MINIMO_NOMBRE_TIPO_ARTICULO), Validators.maxLength(constantes.MAXIMO_NOMBRE_TIPO_ARTICULO)]]
    });
  }

  crear(value: any) {
    this.productosService.crearTipo(value.nombre)
      .subscribe((tipoProducto: TipoProducto) => {
        this.refrescar({ mensaje: "Tipo de artículo creado con éxito.", data: {}, status: HttpStatusCode.Ok });
        this.crearTipoProductoForm.reset();
      });
  }

  get nombre() { return this.crearTipoProductoForm.get('nombre'); }

  refrescar(resultado?: ResultadoApi) {
    this.resultado = resultado;
    this.productosService.obtenerTipos()
      .subscribe((tipoProductos: TipoProducto[]) => this.tipoProductos = tipoProductos);
  }
}
