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

  obtenerImagen(url: string): Observable<Blob> {
    let imagenUrl: string = "";

    if (url.startsWith("http")) {
      imagenUrl = url;
    }
    else {
      imagenUrl = `${this.BASE_URL}${url}`;
    }

    return this.http
      .get(imagenUrl, { responseType: 'blob', observe: 'response' })
      .pipe(
        filter((res: HttpResponse<Blob>) => res.body != null),
        map((res: HttpResponse<Blob>) => res.body as Blob));
  }
}
