import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/clientes/models/RegisterModel';
import { RequesteService } from 'src/app/clientes/services/requeste.service';
import { UserService } from 'src/app/clientes/services/user.service';

type TableResponse = {
  id: number;
  capacity: number;
  status: string;
}

@Component({
  selector: 'app-manage-tables',
  templateUrl: './manage-tables.component.html',
  styleUrls: ['./manage-tables.component.scss']
})
export class ManageTablesComponent {
  tables!: TableResponse[];
  componentVisible = false;


  constructor(public requesteService: RequesteService, private router: Router) { }

  ngOnInit() {
    this.listTables();
  }

  listTables() {
    this.requesteService.getTables().subscribe({
      next: (value) => {
        this.tables = value

        console.log(this.tables)
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

  showComponent() {
    this.componentVisible = true;
  }

}

