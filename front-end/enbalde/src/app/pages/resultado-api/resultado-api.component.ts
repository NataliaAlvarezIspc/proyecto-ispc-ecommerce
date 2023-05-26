import { HttpStatusCode } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ResultadoApi } from 'src/app/models/modelo.resultado';

@Component({
  selector: 'app-resultado-api',
  templateUrl: './resultado-api.component.html',
  styleUrls: ['./resultado-api.component.css']
})

export class ResultadoApiComponent {
  @Input() resultado!: ResultadoApi;

  constructor() {
  }

  ngOnInit(): void {
  }

  successfulResponse(status: HttpStatusCode): boolean {
    return status >= 200 && status <= 299;
  }

  failureResponse(status: HttpStatusCode): boolean {
    return status >= 400 && status <= 599;
  }

}
