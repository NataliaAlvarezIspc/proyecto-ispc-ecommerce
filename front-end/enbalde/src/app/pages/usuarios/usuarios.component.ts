import { Component, Input } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/modelo.usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [ UsuariosService ]
})

export class UsuariosComponent {
  @Input() usuarios: Usuario[];

  constructor(private usuariosService: UsuariosService) {
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.refrescar();
  }

  refrescar() {
     this.usuariosService.obtenerUsuarios()
      .subscribe((usuarios: Usuario[]) => this.usuarios = usuarios);
  }
}
