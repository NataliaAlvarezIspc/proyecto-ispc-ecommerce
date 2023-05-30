import { Component, Input } from '@angular/core';
import { Usuario } from 'src/app/models/modelo.usuario';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ ProductosService]
})

export class HeaderComponent {
  @Input() usuario?: Usuario;
  buscarTerm!: string;
  buscarResults!: any[];
  showResults: boolean = false

  constructor (private productosService: ProductosService) {
  }

  ngOnInit(): void {
    let token = localStorage.getItem('accessToken');
    let usuarioActual = localStorage.getItem('usuarioActual');
    if (usuarioActual) {
      this.usuario = JSON.parse(usuarioActual) as Usuario;
    }
  }

  buscar() {
    this.productosService.buscar(this.buscarTerm).subscribe(results => {
      this.buscarResults = results;
      this.showResults = true;
    });
  }

  limpiar() {
    this.showResults = false;
  }
}
