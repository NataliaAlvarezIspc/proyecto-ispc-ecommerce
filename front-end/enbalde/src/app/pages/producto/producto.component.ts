import { Component, Input } from '@angular/core';
import { Producto } from '../../models/modelo.producto';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { Seleccion } from 'src/app/models/modelo.seleccion';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [ ImagenesService ]
})

export class ProductoComponent {
  @Input() producto?: Producto;
  @Input() imagen: string;

  private _seleccion?: Seleccion;
  @Input() set seleccion(valor: Seleccion | undefined) {
    this.producto = valor?.producto;
    this._seleccion = valor;
  }
  get seleccion(): Seleccion | undefined {
    return this._seleccion;
  }

  constructor(private imagenesService: ImagenesService) {
    this.producto = undefined;
    this.seleccion = undefined;
    this.imagen = "";
  }

  ngOnInit(): void {
    if (this.producto) {
      this.imagenesService.obtenerImagen(this.producto.imagen)
        .subscribe(blob => {
          this.imagen = URL.createObjectURL(blob);
        })
      }
  }
}
