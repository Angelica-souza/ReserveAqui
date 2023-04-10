import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './views/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './views/register/register.component';
import { ManageTablesComponent } from './views/components/manage-tables/manage-tables.component';
import { DescriptionComponent } from './views/components/description/description.component';
import { ReserveComponent } from './views/components/reserve/reserve.component';
import { MyReservationsComponent } from './views/components/my-reservations/my-reservations.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ManageTablesComponent,
    DescriptionComponent,
    ReserveComponent,
    MyReservationsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports:[
    LoginComponent
  ]
})
export class ClientesModule { }
