import { Component, Input } from '@angular/core';
import { Producto } from '../producto/modelo/modelo.producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/productos.service';
import { TipoProducto } from '../producto/modelo/modelo.tipoProducto';

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
    alert(`Editando ${producto.titulo} (próximamente)`);
  }

  borrar(producto: Producto) {
    if (this.productosService.borrarProducto(producto)) {
      alert(`${producto.titulo} borrado correctamente`);
    }
    else {
      alert(`Error borrando ${producto.titulo}`);
    }
  }

  crear(value: any) {
    if (this.productosService.crearProducto(value.nombre, value.descripcion, value.tipo, value.precio, value.cantidad, value.costo, value.imagen)) {
      alert(`Artículo ${value.nombre} creado correctamente`);
    }
    else {
      alert(`Error creando artículo ${value.nombre}`);
    }
  }
}
