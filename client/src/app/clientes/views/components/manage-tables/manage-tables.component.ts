import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { RegisterTablesModel } from 'src/app/models/RegisterTablesModel';


import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RequesteService } from '../../../../services/requeste.service';
import { UserService } from '../../../../services/user.service';
import { NewTablesComponent } from '../new-tables/new-tables.component';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-manage-tables',
  templateUrl: './manage-tables.component.html',
  styleUrls: ['./manage-tables.component.scss']
})
export class ManageTablesComponent {
  tables!: RegisterTablesModel[];
  bsModalRef!: BsModalRef<ConfirmDeleteModalComponent>;

  // @ViewChild('deleteModel') deleteModel!: TemplateRef<any> 


  constructor(
    public userService: UserService,
    public requesteService: RequesteService,
    private router: Router,
    private modalService: BsModalService
  ) { 

  }

  ngOnInit() {
    this.listTables();
    this.isVisible();
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

  deleteTable(id: number) {
    this.bsModalRef = this.modalService.show(
      ConfirmDeleteModalComponent, 
      { 
        class: 'modal-sm', 
        initialState: { 
          tableId: id
        } 
      }
    )

    this.bsModalRef.content?.event.subscribe((value) => {
      this.requesteService.delTables(value.tableId).subscribe((value) => {
        this.listTables()
      })
    })
  }

  formTable() {
     this.modalService.show(NewTablesComponent, { class: 'modal-sm' })
  }

  isVisible() {
    if (!this.userService.getAdmin()) this.router.navigate(['']);
  }

}

