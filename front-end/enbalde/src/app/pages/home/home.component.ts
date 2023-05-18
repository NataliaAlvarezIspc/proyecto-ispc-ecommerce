import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: any[] = [];

  constructor(private apiService: HomeService) { }

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData() {
    this.apiService.getData().subscribe(response => {
      this.data = response.results;
      console.log('ESTO FUNCIONA PERFECTO', this.data);
    });
  }
}
