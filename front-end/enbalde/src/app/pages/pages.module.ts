import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactoComponent } from './contacto/contacto.component';
import { LoginComponent } from './login/login.component';
import { RegistracionComponent } from './registracion/registracion.component';
import { AltaProductoComponent } from './alta-producto/alta-producto.component';
import { CatalogComponent } from './catalogo/catalogo.component';
import { ProductoComponent } from './producto/producto.component';


@NgModule({
  declarations: [
    HomeComponent,
    ContactoComponent,
    LoginComponent,
    RegistracionComponent,
    AltaProductoComponent,
    CatalogComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
