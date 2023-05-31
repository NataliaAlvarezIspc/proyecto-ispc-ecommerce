import { HttpStatusCode } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { Usuario, TipoUsuario } from 'src/app/models/modelo.usuario';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ ProductosService, UsuariosService ]
})

export class HeaderComponent {
  @Input() usuario?: Usuario;
  buscarTerm!: string;
  buscarResults!: any[];
  showResults: boolean = false

  constructor (private productosService: ProductosService, private usuariosService: UsuariosService, private router: Router) {
    this.usuariosService.UsuarioIngresando
      .subscribe((u: Usuario) => {
        this.usuario = u;
      });
  }

  ngOnInit(): void {
    let token = localStorage.getItem('accessToken');
    let usuarioActual = localStorage.getItem('usuarioActual');
    console.log(usuarioActual)
    if (usuarioActual) {
      console.log(1)
      this.usuario = JSON.parse(usuarioActual) as Usuario;
    }
    else {
      console.log(2)
      this.usuario = undefined;
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

  logout() {
    this.usuariosService.logout()
      .subscribe((resultado: ResultadoApi) => {
        if (resultado.status == HttpStatusCode.Ok) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('usuarioActual')
          this.usuariosService.UsuarioIngresando.emit(null);
          this.router.navigate((['/']));
        }
      });
  }

  esUsuarioAdministrador = () => this.usuario?.tipo == TipoUsuario.Administrador;

  esUsuarioCliente = () => this.usuario?.tipo == TipoUsuario.Cliente;
}
