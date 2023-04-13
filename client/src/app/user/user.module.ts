import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ClientesModule } from '../clientes/clientes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserControlComponent } from './user-control/user-control.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UserControlComponent
  ],
  imports: [
    CommonModule, 
    ClientesModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    UserControlComponent
  ]
})
export class UserModule { }
