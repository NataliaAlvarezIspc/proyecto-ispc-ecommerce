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
import { AbmEnviosComponent } from './pages/abm-envios/abm-envios.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ComprasComponent } from './pages/compras/compras.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent, pathMatch: "full" },
  { path: 'registracion', component: RegistracionComponent, pathMatch: "full" },
  { path: 'carrito', component: CarritoComponent },
  { path: 'catalogo', component: CatalogComponent },
  { path: 'restablecer', component: RestablecerComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tipo-producto', component: TipoProductoComponent },
  { path: 'abm-envios', component: AbmEnviosComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'perfil', component: PerfilComponent},
  { path: 'compras', component: ComprasComponent}
];

export const routing = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes), ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
