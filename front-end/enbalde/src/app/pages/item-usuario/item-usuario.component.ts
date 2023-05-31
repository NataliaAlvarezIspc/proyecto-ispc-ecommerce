import { Component, Input } from '@angular/core';
import { FuncionesService } from 'src/app/services/funciones.service';
import { Usuario } from 'src/app/models/modelo.usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-item-usuario',
  templateUrl: './item-usuario.component.html',
  styleUrls: ['./item-usuario.component.css'],
  providers: [UsuariosService, FuncionesService]
})

export class ItemUsuarioComponent {
  idEditando: number;

  @Input() usuario?: Usuario;

  constructor(public funcionesService: FuncionesService) {
    this.idEditando = -1;
    this.usuario = undefined;
  }

  editar(usuario: Usuario) {
    this.idEditando = usuario.id;
  }

  borrar(usuario: Usuario) {
  }
}
