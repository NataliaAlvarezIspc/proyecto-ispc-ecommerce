import { Component, Input } from '@angular/core';
import { HttpStatusCode } from '@angular/common/http';
import { Producto } from '../../models/modelo.producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoProducto } from '../../models/modelo.tipoProducto';
import { ProductosService } from 'src/app/services/productos.service';
import { ResultadoApi } from 'src/app/models/modelo.resultado';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent {
  crearProductoForm!: FormGroup;

  @Input() productos: Producto[] = []
  @Input() tipoProductos: TipoProducto[] = [];

  constructor(private formBuilder: FormBuilder, private productosService: ProductosService) {
  }

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe((productos: Producto[]) => this.productos = productos);
    this.productosService.obtenerTipos().subscribe((tipoProductos: TipoProducto[]) => this.tipoProductos = tipoProductos);

    this.crearProductoForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      descripcion: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      tipo: [0, [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0)]],
      costo: [0, [Validators.required, Validators.min(0)]],
      cantidad: [0, [Validators.required, Validators.min(0)]],
      imagen: [""]
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

  crear(value: any) {
    let tipoProducto: TipoProducto = this.tipoProductos.filter(tp => tp.id == value.tipo)[0];
    this.productosService.crearProducto(value.nombre, value.descripcion, value.precio, value.cantidad, value.costo, value.imagen, tipoProducto)
      .subscribe({
        next: (r: ResultadoApi) => { alert(`${r.mensaje}`); },
        error: (error: ResultadoApi) => { alert(error.mensaje); console.log(error.data); },
        complete: () => {}
      });
  }
}
