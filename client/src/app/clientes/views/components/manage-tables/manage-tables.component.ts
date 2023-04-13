import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { RegisterTablesModel } from 'src/app/models/RegisterTablesModel';
import { RequesteService } from '../../../../services/requeste.service';
import { UserService } from '../../../../services/user.service';

// type TableResponse = {
//   id: number;
//   capacity: number;
//   status: string;
// }

@Component({
  selector: 'app-manage-tables',
  templateUrl: './manage-tables.component.html',
  styleUrls: ['./manage-tables.component.scss']
})
export class ManageTablesComponent {
  tables!: RegisterTablesModel[];
  componentVisible = false;
  componentEditVisible = false


  constructor( public userService: UserService, public requesteService: RequesteService, private router: Router) { }

  ngOnInit() {
    this.listTables();

    this.manegeVisible();
  }

  listTables() {
    this.requesteService.getTables().subscribe({
      next: (value) => {
        this.tables = value
      },
      error(err) {
        console.error("errors");
      },
    })
  }

  deleteTable(id: number){

    this.requesteService.delTables(id).subscribe({
      next: (value) => {
        location.reload();
      },
      error(err) {
        console.error("errors");
      },
    })
  }

  showNewComponent() {
    this.componentVisible = true;
  }

  showEditComponent(){
    this.componentEditVisible = true;
  }

  manegeVisible(){
    if(!this.userService.getAdmin()) this.router.navigate(['']);
  }

  editTable(){
    this.showEditComponent();
  }
}

