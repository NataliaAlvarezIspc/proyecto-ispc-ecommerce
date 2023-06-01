import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { HomeComponent } from './pages/home/home.component';
import { CatalogComponent } from './pages/catalogo/catalogo.component'
import { RegistracionComponent } from './pages/registracion/registracion.component';
import { LoginComponent } from './pages/login/login.component';
import { RestablecerComponent } from './pages/restablecer/restablecer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TipoProductoComponent } from './pages/tipo-producto/tipo-producto.component';
import { EnviosComponent } from './pages/envios/envios.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { OfertasComponent } from './pages/ofertas/ofertas.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AuthGuard } from './services/auth.guard';
import { TipoUsuario } from './models/modelo.usuario';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent, pathMatch: "full" },
  { path: 'registracion', component: RegistracionComponent, pathMatch: "full" },
  { path: 'carrito', component: CarritoComponent, canActivate: [AuthGuard], data: { rol: TipoUsuario.Cliente } },
  { path: 'catalogo', component: CatalogComponent },
  { path: 'restablecer', component: RestablecerComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { rol: [ TipoUsuario.Administrador ] } },
  { path: 'tipo-producto', component: TipoProductoComponent, canActivate: [AuthGuard], data: { rol: [ TipoUsuario.Administrador ] } },
  { path: 'envios', component: EnviosComponent, canActivate: [AuthGuard], data: { rol: [ TipoUsuario.Administrador ] } },
  { path: 'ventas', component: VentasComponent, canActivate: [AuthGuard], data: { rol: [ TipoUsuario.Administrador ] } },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard], data: { rol: [ TipoUsuario.Administrador, TipoUsuario.Cliente ] } },
  { path: 'ofertas', component: OfertasComponent, canActivate: [AuthGuard], data: { rol: [ TipoUsuario.Administrador ] } },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard], data: { rol: [ TipoUsuario.Administrador ] } },
  { path: 'compras', component: ComprasComponent, canActivate: [AuthGuard], data: { rol: [ TipoUsuario.Cliente ] } },
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
