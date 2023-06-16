import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { TipoUsuario, Usuario } from 'src/app/models/modelo.usuario';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { FuncionesService } from 'src/app/services/funciones.service';
import { constantes } from 'src/environment/constantes';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuariosService, FuncionesService]
})

export class UsuariosComponent {
  readonly constantes = constantes;
  crearUsuarioForm!: FormGroup;
  tipoUsuarios = [
    { id: TipoUsuario.Administrador, nombre: "Administrador" },
    { id: TipoUsuario.Cliente, nombre: "Cliente" }
  ];

  @Input() usuarios: Usuario[];
  @Input() resultado?: ResultadoApi;

  constructor(private formBuilder: FormBuilder, private usuariosService: UsuariosService, public funcionesService: FuncionesService) {
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.refrescar();
    this.usuariosService.obtenerUsuarios().subscribe((usuarios: Usuario[]) => this.usuarios = usuarios);

    this.crearUsuarioForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(constantes.MINIMO_NOMBRE_USUARIO), Validators.maxLength(constantes.MAXIMO_NOMBRE_USUARIO)]],
      apellido: ["", [Validators.required, Validators.minLength(constantes.MINIMO_APELLIDO_USUARIO), Validators.maxLength(constantes.MAXIMO_APELLIDO_USUARIO)]],
      email: ["", [Validators.required, Validators.minLength(constantes.MINIMO_EMAIL_USUARIO), Validators.pattern(constantes.PATRON_EMAIL), Validators.maxLength(constantes.MAXIMO_EMAIL_USUARIO)]],
      direccion: ["", [Validators.required, Validators.maxLength(constantes.MAXIMA_DIRECCION_USUARIO)]],
      usuario: ["", [Validators.required, Validators.minLength(constantes.MINIMO_USUARIO_USUARIO), Validators.maxLength(constantes.MAXIMO_USUARIO_USUARIO)]],
      clave: ["", [Validators.required, Validators.minLength(constantes.MINIMA_CLAVE_USUARIO), Validators.maxLength(constantes.MAXIMA_CLAVE_USUARIO)]],
      telefono: ["", [Validators.required, Validators.minLength(constantes.MINIMO_TELEFONO_USUARIO), Validators.maxLength(constantes.MAXIMO_TELEFONO_USUARIO)]],
      tipoUsuario: [TipoUsuario.Cliente, [Validators.required]]
    });
  }

  get nombre() { return this.crearUsuarioForm.get('nombre'); }
  get apellido() { return this.crearUsuarioForm.get('apellido'); }
  get email() { return this.crearUsuarioForm.get('email'); }
  get direccion() { return this.crearUsuarioForm.get('direccion'); }
  get usuario() { return this.crearUsuarioForm.get('usuario'); }
  get clave() { return this.crearUsuarioForm.get('clave'); }
  get telefono() { return this.crearUsuarioForm.get('telefono'); }
  get tipoUsuario() { return this.crearUsuarioForm.get('tipoUsuario'); }

  refrescar() {
     this.usuariosService.obtenerUsuarios()
      .subscribe((usuarios: Usuario[]) => this.usuarios = usuarios);
  }

  crear(value: any) {
    this.usuariosService.registrar(value.nombre, value.apellido, value.email, value.direccion, value.usuario, value.clave, value.telefono, value.tipoUsuario)
      .subscribe({
        next: (exito: ResultadoApi) => { this.resultado = exito;  this.crearUsuarioForm.reset(); this.refrescar(); },
        error: (error: ResultadoApi) => { this.resultado = error; },
        complete: () => {}
      });
  }
}
