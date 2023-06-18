import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../models/modelo.producto';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { Seleccion } from 'src/app/models/modelo.seleccion';
import { Oferta } from 'src/app/models/modelo.oferta';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [ImagenesService]
})

export class ProductoComponent {
  @Input() producto?: Producto;
  @Input() imagen: string;
  @Input() ofertas: Oferta[];
  @Input() descuento: number;
  @Input() total: number;
  @Input() botonPositivo: string;
  @Input() botonNegativo: string;
  @Output() positivo: EventEmitter<any> = new EventEmitter<any>();
  @Output() negativo: EventEmitter<any> = new EventEmitter<any>();

  private _seleccion?: Seleccion;
  @Input() set seleccion(valor: Seleccion | undefined) {
    this._seleccion = valor;
    this.producto = valor?.articulo;
    this.descuento = valor?.descuento ?? 0;
    this.ofertas = valor?.ofertas ?? [];
    this.total = valor?.total ?? valor?.articulo.precio ?? 0;
  }
  get seleccion(): Seleccion | undefined {
    return this._seleccion;
  }

  constructor(private imagenesService: ImagenesService) {
    this.producto = undefined;
    this.seleccion = undefined;
    this.imagen = "";
    this.ofertas = [];
    this.descuento = 0;
    this.total = 0;
    this.botonPositivo = "";
    this.botonNegativo = "";
  }

  ngOnInit(): void {
    if (this.producto) {
      this.imagenesService.obtenerImagen(this.producto.imagen)
        .subscribe(blob => {
          this.imagen = URL.createObjectURL(blob);
        })
      }
  }

  onPositivo = () => this.positivo.emit();

  onNegativo = () => this.negativo.emit();
}
