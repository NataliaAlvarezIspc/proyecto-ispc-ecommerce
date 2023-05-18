import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private urlApi = 'https://randomuser.me/api/?results=5';
 
  constructor(private http : HttpClient) { }

public getData(): Observable<any>{
  return this.http.get<any>(this.urlApi);
 
}
}
