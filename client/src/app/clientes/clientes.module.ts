import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { ReactiveFormsModule } from '@angular/forms';
import { ManageTablesComponent } from './views/components/manage-tables/manage-tables.component';
import { DescriptionComponent } from './views/components/description/description.component';
import { ReserveComponent } from './views/components/reserve/reserve.component';
import { MyReservationsComponent } from './views/components/my-reservations/my-reservations.component';
import { NewTablesComponent } from './views/components/new-tables/new-tables.component';

import { HomeComponent } from './views/home/home.component';
import { EditTablesComponent } from './views/components/edit-tables/edit-tables.component';
import { ModalFormComponent } from './views/components/modal-form/modal-form.component';

@NgModule({
  declarations: [
    ManageTablesComponent,
    DescriptionComponent,
    ReserveComponent,
    MyReservationsComponent,
    NewTablesComponent,
    HomeComponent,
    EditTablesComponent,
    ModalFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports:[
    ManageTablesComponent,
    DescriptionComponent,
    ReserveComponent,
    MyReservationsComponent,
    NewTablesComponent,
    HomeComponent,
    EditTablesComponent,
    ModalFormComponent
  ]
})
export class ClientesModule { }
