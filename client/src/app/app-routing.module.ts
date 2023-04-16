import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';

import { LoginComponent } from './user/login/login.component'
import { HomeComponent } from './clientes/views/home/home.component';
import { RegisterComponent } from './user/register/register.component';
import { DescriptionComponent } from './clientes/views/components/description/description.component';
import { ReserveComponent } from './clientes/views/components/reserve/reserve.component';
import { MyReservationsComponent } from './clientes/views/components/my-reservations/my-reservations.component';
import { ManageTablesComponent } from './clientes/views/components/manage-tables/manage-tables.component';
import { NewTablesComponent } from './clientes/views/components/new-tables/new-tables.component';
import { EditTablesComponent } from './clientes/views/components/edit-tables/edit-tables.component';
import { UserControlComponent } from './user/user-control/user-control.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: '', component: DescriptionComponent },
      { path: 'reserve', component: ReserveComponent },
      { path: 'myReservations', component: MyReservationsComponent },
      {
        path: 'manegeTables', component: ManageTablesComponent
      },
      { path: 'newTablesModal', component: NewTablesComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: 'userControl', pathMatch: 'full'
  },
  {
    path: 'userControl',
    component: UserControlComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
