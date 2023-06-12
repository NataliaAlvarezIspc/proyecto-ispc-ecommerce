import { Oferta } from "./modelo.oferta";
import { Producto } from "./modelo.producto";

export interface Seleccion {
  articulo: Producto;
  cantidad: number;
  ofertas: Oferta[];
  descuento: number;
  total: number;
}
