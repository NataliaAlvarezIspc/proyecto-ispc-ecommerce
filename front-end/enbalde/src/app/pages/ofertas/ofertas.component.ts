import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Oferta } from '../../models/modelo.oferta';
import { OfertasService } from 'src/app/services/ofertas.service';
import { Producto } from 'src/app/models/modelo.producto';
import { ProductosService } from 'src/app/services/productos.service';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
  providers: [ OfertasService ]
})

export class OfertasComponent {
  crearOfertaForm!: FormGroup;

  @Input() ofertas: Oferta[];
  @Input() productos: Producto[];

  constructor(private formBuilder: FormBuilder, private ofertasService: OfertasService, private productosService: ProductosService, private funcionesService: FuncionesService) {
    this.ofertas = [];
    this.productos = [];
  }

  ngOnInit(): void {
    this.ofertasService.obtenerOfertas().subscribe((ofertas: Oferta[]) => this.ofertas = ofertas);
    this.crearOfertaForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      descuento: ["", [Validators.required, Validators.min(0), Validators.max(100)]],
      fechaVencimiento: ["", [Validators.required]],
      productosAsociados: [this.formBuilder.array<number>([])]
    });

    this.productosService.obtenerProductos()
      .subscribe((productos: Producto[]) => this.productos = productos);
  }

  get nombre() { return this.crearOfertaForm.get('nombre'); }

  get descuento() { return this.crearOfertaForm.get('descuento'); }

  get fechaVencimiento() { return this.crearOfertaForm.get('fechaVencimiento'); }

  get productosAsociados() { return this.crearOfertaForm.get('productosAsociados'); }

  crear(value: any) {
    let articulos: number[] = this.productosAsociados?.value as number[] ?? [];
    this.ofertasService.crear(value.nombre, value.descuento, value.fechaVencimiento, articulos)
      .subscribe((oferta: Oferta) => {
        this.refrescar();
        this.crearOfertaForm.reset();
      })
  }

  refrescar(): void {
    this.ofertasService.obtenerOfertas()
      .subscribe((ofertas: Oferta[]) => this.ofertas = ofertas);
  }

  crearId = this.funcionesService.crearId;
}
