import { Component, Input } from '@angular/core';
import { Producto } from '../../models/modelo.producto';
import { ImagenesService } from 'src/app/services/imagenes.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [ ImagenesService ]
})

export class ProductoComponent {
  @Input() muestra: boolean = true;
  @Input() producto!: Producto;
  @Input() imagen: string = "";

  constructor(private imagenesService: ImagenesService) {
  }

  ngOnInit(): void {
    this.imagenesService.obtenerImagen(this.producto.imagen)
      .subscribe(blob => {
        this.imagen = URL.createObjectURL(blob);
      })
  }
}
