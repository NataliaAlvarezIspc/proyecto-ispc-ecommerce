import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  constructor(@Inject(LOCALE_ID) private locale: string) { }

  crearId = (id: number) => `id-${id}`;

  extraerId = (id: string) => parseInt(id.split("-")[1]);

  visualizarFecha = (fecha: Date) => formatDate(fecha, 'yyyy-MM-dd hh:mm', this.locale);
}
