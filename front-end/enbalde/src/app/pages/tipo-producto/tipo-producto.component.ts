import { Component, Input } from '@angular/core';
import { TipoProducto } from '../../models/modelo.tipoProducto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.css'],
  providers: [ ProductosService ]
})

export class TipoProductoComponent {
  crearTipoProductoForm!: FormGroup;
  mostrarMensajeExitoso : boolean = false;
  @Input() tipoProductos: TipoProducto[] = [];
  @Input() resultado: ResultadoApi;

  constructor(private formBuilder: FormBuilder, private productosService: ProductosService) {
    this.resultado = {
      mensaje: "",
      data: {},
      status: 0 as HttpStatusCode
    }
  }

  ngOnInit(): void {
    this.refrescar();
    this.crearTipoProductoForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]]
    });
  }

  crear(value: any) {
    this.productosService.crearTipo(value.nombre)
      .subscribe({
        next: (exito: ResultadoApi) => { this.resultado = exito; this.refrescar(); 
        this.mostrarMensajeExitoso = true;
        setTimeout(()=>{
          this.mostrarMensajeExitoso = false;
        }, 3000);
        this.crearTipoProductoForm.reset();
        },
        error: (error: ResultadoApi) => { this.resultado = error; },
        complete: () => {}
      });
  }

  get nombre() { return this.crearTipoProductoForm.get('nombre'); }

  refrescar() {
    this.productosService.obtenerTipos()
      .subscribe((tipoProductos: TipoProducto[]) => this.tipoProductos = tipoProductos);
  }
}
