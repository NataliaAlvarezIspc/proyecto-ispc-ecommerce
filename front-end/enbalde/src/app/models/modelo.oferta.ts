export interface Oferta {
  id: number;
  nombre: string;
  descuento: number;
  fechaVencimiento: Date;
  articulos: Array<{id:number}>;
}
