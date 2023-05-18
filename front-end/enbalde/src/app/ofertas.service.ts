import { Injectable } from '@angular/core';
import { Oferta, OfertaClass } from './pages/ofertas/modelo/modelo.oferta';

@Injectable({
  providedIn: 'root'
})

export class OfertasService {
  private ofertas: Oferta[];

  constructor() {
    this.ofertas = [
      new OfertaClass(1, "10% Off", 10),
      new OfertaClass(2, "20% Off", 20),
      new OfertaClass(3, "30% Off", 30),
      new OfertaClass(4, "50% Off", 50)
    ];
  }

  obtenerOfertas(): Oferta[] {
    return this.ofertas;
  }

  borrar(oferta: Oferta): boolean {
    return true;
  }

  crear(nombre: string, descuento: number): boolean {
    return true;
  }

  modificar(oferta: Oferta, nuevoNombre: string, nuevoDescuento: number): boolean {
    return true;
  }
}
