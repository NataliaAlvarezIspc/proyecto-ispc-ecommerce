import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class ImagenesService {
  BASE_URL = environment.SITE_URL;

  constructor(private http: HttpClient) {
  }

  obtenerImagen(urlRelativa: string): Observable<Blob> {
    return this.http
      .get(`${this.BASE_URL}${urlRelativa}`, { responseType: 'blob', observe: 'response' })
      .pipe(
        filter((res: HttpResponse<Blob>) => res.body !== null),
        map((res: HttpResponse<Blob>) => res.body as Blob));
  }
}
