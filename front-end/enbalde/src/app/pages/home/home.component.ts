import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  itemCarrusel1 = '../assets/img/heladoCarousel.jpg';
  itemCarrusel2 = '../assets/img/heladoCarousel1.jpg';
  itemCarrusel3 = '../assets/img/heladoCarousel2.jpg';
  itemFernet = '../assets/img/Fernet.jpg';
  itemCaramelo = '../assets/img/Caramelo.jpg';
  itemPritiado = '../assets/img/Pritiado.jpg';
  itemDarkChocolate = '../assets/img/Dark_Chocolate.jpg';

  data: any[] = [];

  constructor(private apiService: HomeService) { }

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData() {
    this.apiService.getData().subscribe(response => {
      this.data = response.results;
    });
  }
}
