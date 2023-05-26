import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ImagenesService {
  constructor(private http: HttpClient) { }

  obtenerImagen(urlRelativa: string): Observable<Blob> {
    return this.http
      .get(`http://localhost:8000/${urlRelativa}`, { responseType: 'blob', observe: 'response' })
      .pipe(
        filter((res: HttpResponse<Blob>) => res.body !== null),
        map((res: HttpResponse<Blob>) => res.body as Blob));
  }
}
