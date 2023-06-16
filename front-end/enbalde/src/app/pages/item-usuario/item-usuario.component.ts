import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FuncionesService } from 'src/app/services/funciones.service';
import { TipoUsuario, Usuario } from 'src/app/models/modelo.usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { constantes } from 'src/environment/constantes';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-item-usuario',
  templateUrl: './item-usuario.component.html',
  styleUrls: ['./item-usuario.component.css'],
  providers: [UsuariosService, FuncionesService]
})

export class ItemUsuarioComponent {
  editarItemUsuarioForm!: FormGroup;
  idEditando: number;
  tipoUsuarios = [
      { id: TipoUsuario.Administrador, nombre: "Administrador" },
      { id: TipoUsuario.Cliente, nombre: "Cliente" }
    ];

  @Input() usuario?: Usuario;
  @Output() refrescar: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, public funcionesService: FuncionesService, private usuariosService: UsuariosService) {
    this.idEditando = -1;
    this.usuario = undefined;
  }

  ngOnInit(): void {
    this.editarItemUsuarioForm = this.formBuilder.group({
      nuevoNombre: ["", [Validators.required, Validators.minLength(constantes.MINIMO_NOMBRE_USUARIO), Validators.maxLength(constantes.MAXIMO_NOMBRE_USUARIO)]],
      nuevoApellido: ["", [Validators.required, Validators.minLength(constantes.MINIMO_APELLIDO_USUARIO), Validators.maxLength(constantes.MAXIMO_APELLIDO_USUARIO)]],
      nuevoEmail: ["", [Validators.required, Validators.minLength(constantes.MINIMO_EMAIL_USUARIO), Validators.pattern(constantes.PATRON_EMAIL), Validators.maxLength(constantes.MAXIMO_EMAIL_USUARIO)]],
      nuevaDireccion: ["", [Validators.required, Validators.maxLength(constantes.MAXIMA_DIRECCION_USUARIO)]],
      nuevoUsuario: ["", [Validators.required, Validators.minLength(constantes.MINIMO_USUARIO_USUARIO), Validators.maxLength(constantes.MAXIMO_USUARIO_USUARIO)]],
      nuevaClave: ["", [Validators.minLength(constantes.MINIMA_CLAVE_USUARIO), Validators.maxLength(constantes.MAXIMA_CLAVE_USUARIO)]],
      nuevoTelefono: ["", [Validators.required, Validators.minLength(constantes.MINIMO_TELEFONO_USUARIO), Validators.maxLength(constantes.MAXIMO_TELEFONO_USUARIO)]],
      nuevoTipoUsuario: [TipoUsuario.Cliente, [Validators.required]],
      nuevasObservaciones: ["", [Validators.minLength(constantes.MINIMA_OBSERVACION_USUARIO), Validators.maxLength(constantes.MAXIMA_OBSERVACION_USUARIO)]]
    });
  }

  editar(usuario: Usuario) {
    this.editarItemUsuarioForm.get("nuevoNombre")?.setValue(usuario.nombre);
    this.editarItemUsuarioForm.get("nuevoApellido")?.setValue(usuario.apellido);
    this.editarItemUsuarioForm.get("nuevoEmail")?.setValue(usuario.email);
    this.editarItemUsuarioForm.get("nuevaDireccion")?.setValue(usuario.direccion);
    this.editarItemUsuarioForm.get("nuevoUsuario")?.setValue(usuario.usuario);
    this.editarItemUsuarioForm.get("nuevoTelefono")?.setValue(usuario.telefono);
    this.editarItemUsuarioForm.get("nuevoTipoUsuario")?.setValue(usuario.tipo);
    this.editarItemUsuarioForm.get("nuevasObservaciones")?.setValue(usuario.observaciones);
    this.idEditando = usuario.id;
  }

  borrar(usuario: Usuario) {
    this.usuariosService.borrar(usuario)
      .subscribe(_ => this.refrescar.emit());
  }

  cancelar(usuario: Usuario) {
    this.idEditando = -1;
  }

  grabar(usuario: Usuario, value: any) {
    this.usuariosService.modificar(usuario, value.nuevaDireccion, value.nuevoEmail, value.nuevaClave, value.nuevoTelefono, value.nuevasObservaciones, value.nuevoNombre, value.nuevoApellido, value.nuevoUsuario, value.nuevoTipoUsuario)
      .subscribe((respuesta: Usuario) => {
          this.usuario = respuesta;
          this.idEditando = -1;
          this.refrescar.emit({ mensaje: "Usuario modificado exitosamente", data: {}, status: HttpStatusCode.Ok })
        });
  }

  mostrarTipoDeUsuario = (tipo: TipoUsuario) => tipo == TipoUsuario.Cliente ? "Cliente" : "Admin";
}
