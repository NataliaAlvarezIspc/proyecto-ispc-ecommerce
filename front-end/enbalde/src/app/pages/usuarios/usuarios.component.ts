import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { TipoUsuario, Usuario } from 'src/app/models/modelo.usuario';
import { ResultadoApi } from 'src/app/models/modelo.resultado';
import { FuncionesService } from 'src/app/services/funciones.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuariosService, FuncionesService]
})

export class UsuariosComponent {
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
      nombre: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      apellido: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      email: ["", [Validators.required, Validators.minLength(10), Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), Validators.maxLength(45)]],
      direccion: ["", [Validators.required, Validators.maxLength(40)]],
      usuario: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      clave: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      telefono: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(25)]],
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
        next: (exito: ResultadoApi) => { this.resultado = exito;  this.crearUsuarioForm.reset();},
        error: (error: ResultadoApi) => { this.resultado = error; },
        complete: () => {}
      });
  }
}
