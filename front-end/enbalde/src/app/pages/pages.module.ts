import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './login/login.component';
import { RegistracionComponent } from './registracion/registracion.component';
import { AltaProductoComponent } from './alta-producto/alta-producto.component';
import { CatalogComponent } from './catalogo/catalogo.component';
import { RouterModule } from '@angular/router';
import { ProductoComponent } from './producto/producto.component';
import { RestablecerComponent } from './restablecer/restablecer.component';
import { CarritoComponent } from './carrito/carrito/carrito.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TipoProductoComponent } from './tipo-producto/tipo-producto.component';
import { AbmEnviosComponent } from './abm-envios/abm-envios.component';
import { VentasComponent } from './ventas/ventas.component';

@NgModule({
  declarations: [
    HomeComponent,
    ContactoComponent,
    LoginComponent,
    RegistracionComponent,
    AltaProductoComponent,
    CatalogComponent,
    ProductoComponent,
    RestablecerComponent,
    CarritoComponent,
    DashboardComponent,
    TipoProductoComponent,
    AbmEnviosComponent,
    VentasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})

export class PagesModule { }
