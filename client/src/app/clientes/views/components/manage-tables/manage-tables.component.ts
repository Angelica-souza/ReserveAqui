import { Component } from '@angular/core';
import { RequesteService } from 'src/app/clientes/services/requeste.service';

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

  constructor(public requesteService: RequesteService) { }

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
  }

