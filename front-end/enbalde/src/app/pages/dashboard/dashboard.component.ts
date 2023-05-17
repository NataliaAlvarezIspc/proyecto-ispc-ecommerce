import { Component, Input } from '@angular/core';
import { Producto, ProductoClass } from '../producto/modelo/modelo.producto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/productos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  crearProductoForm!: FormGroup;

  @Input() productos!: Producto [];

  constructor(private formBuilder: FormBuilder, private productosService: ProductosService) {
    this.productos = this.productosService.obtenerProductos();
  }

  ngOnInit(): void {
    this.crearProductoForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      descripcion: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      tipo: ["", [Validators.required]],
      precio: [0, [Validators.required, Validators.min(0)]],
      costo: [0, [Validators.required, Validators.min(0)]],
      alicuota: [0, [Validators.required, Validators.min(0)]],
      imagen: [""]
    });
  }

  editar(producto: Producto) {
    alert(`Editando ${producto.titulo} (próximamente)`);
  }

  borrar(producto: Producto) {
    alert(`Borrando ${producto.titulo} (próximamente)`);
  }

  crear(value: any) {
    if (this.productosService.crearProducto(value.nombre, value.descripcion, value.tipo, value.precio, value.costo, value.alicuota, value.imagen)) {
      alert(`Artículo ${value.nombre} creado correctamente`);
    }
    else {
      alert(`Error creando artículo ${value.nombre}`);
    }
  }
}
