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
import { BsModalService} from 'ngx-bootstrap/modal';
import { ConfirmDeleteModalComponent } from './views/components/confirm-delete-modal/confirm-delete-modal.component';

@NgModule({
  declarations: [
    ManageTablesComponent,
    DescriptionComponent,
    ReserveComponent,
    MyReservationsComponent,
    NewTablesComponent,
    HomeComponent,
    EditTablesComponent,
    ConfirmDeleteModalComponent,
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
    EditTablesComponent
  ],
  providers: [BsModalService, ManageTablesComponent]
})
export class ClientesModule { }
