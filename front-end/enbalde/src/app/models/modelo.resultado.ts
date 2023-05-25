import { HttpStatusCode } from "@angular/common/http";

export interface ResultadoApi {
  mensaje: string;
  data: object;
  status: HttpStatusCode;
}
