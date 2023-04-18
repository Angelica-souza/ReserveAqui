import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BsModalService} from 'ngx-bootstrap/modal';

import { ManageTablesComponent } from './views/components/manage-tables/manage-tables.component';
import { DescriptionComponent } from './views/components/description/description.component';
import { ReserveComponent } from './views/components/reserve/reserve.component';
import { MyReservationsComponent } from './views/components/my-reservations/my-reservations.component';
import { HomeComponent } from './views/home/home.component';
import { ConfirmDeleteModalComponent } from './views/components/confirm-delete-modal/confirm-delete-modal.component';
import { FormModalComponent } from './views/components/form-modal/form-modal.component';

@NgModule({
  declarations: [
    ManageTablesComponent,
    DescriptionComponent,
    ReserveComponent,
    MyReservationsComponent,
    HomeComponent,
    ConfirmDeleteModalComponent,
    FormModalComponent,
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
    MyReservationsComponent,
    HomeComponent,
    FormModalComponent
  ],
  providers: [BsModalService, ManageTablesComponent]
})
export class ClientesModule { }
