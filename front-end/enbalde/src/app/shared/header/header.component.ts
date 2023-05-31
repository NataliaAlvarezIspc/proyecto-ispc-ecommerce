import { HttpStatusCode } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { Usuario, TipoUsuario } from 'src/app/models/modelo.usuario';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor (private productosService: ProductosService, private usuariosService: UsuariosService, private authService: AuthService, private router: Router) {
    this.authService.autenticado
      .subscribe((auth: boolean) => {
        if (auth) {
          this.usuario = this.authService.usuario;
        }
      });
  }

  ngOnInit(): void {
    let token = localStorage.getItem('accessToken');
    let usuarioActual = localStorage.getItem('usuarioActual');
    if (usuarioActual) {
      this.usuario = JSON.parse(usuarioActual) as Usuario;
    }
    else {
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
    this.authService.logout()
      .subscribe((resultado: ResultadoApi) => {
        if (resultado.status == HttpStatusCode.Ok) {
          this.usuario = undefined;
          this.router.navigate((['/']));
        }
      });
  }

  esUsuarioAdministrador = () => this.usuario?.tipo == TipoUsuario.Administrador;

  esUsuarioCliente = () => this.usuario?.tipo == TipoUsuario.Cliente;
}
