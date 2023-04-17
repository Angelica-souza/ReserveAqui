import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { RegisterTablesModel } from 'src/app/models/RegisterTablesModel';


import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RequesteService } from '../../../../services/requeste.service';
import { UserService } from '../../../../services/user.service';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { FormModalComponent } from '../form-modal/form-modal.component';

@Component({
  selector: 'app-manage-tables',
  templateUrl: './manage-tables.component.html',
  styleUrls: ['./manage-tables.component.scss']
})
export class ManageTablesComponent {
  tables!: RegisterTablesModel[];

  deleteModal!: BsModalRef<ConfirmDeleteModalComponent>;
  formModal!: BsModalRef<FormModalComponent>;

  // @ViewChild(FormModalComponent) edit!: FormModalComponent

  constructor(
    public userService: UserService,
    public requesteService: RequesteService,
    private router: Router,
    private modalService: BsModalService,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    this.isVisible();
    this.listTables();
  }

  isVisible() {
    if (!this.userService.getAdmin()) this.router.navigate(['']);
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

  confirmDelete(id: number) {
    this.deleteModal = this.modalService.show(
      ConfirmDeleteModalComponent,
      {
        class: 'modal-sm',
        initialState: {
          tableId: id
        }
      }
    );

    this.deleteTable();
  }

  deleteTable() {
    this.deleteModal.content?.event.subscribe((value) => {
      this.requesteService.delTables(value.tableId).subscribe((value) => {
        this.listTables()
      })
    })
  }

  formTable() {
    this.formModal = this.modalService.show(FormModalComponent, { class: 'modal-sm' })

    this.formModal.content?.event.subscribe((requeste) => {
      this.requesteService.setTables(requeste.dataTables).subscribe({
        next: (value) => {
          this.listTables()
        },
        error(err) {
          console.error("errors");
        },
      });
    })
  }

  onEdit(id: number) {
    this.formModal = this.modalService.show(FormModalComponent, {
      class: 'modal-sm',
      initialState: {
        tableId: id
      }
    })

    this.formModal.content?.event.subscribe((requeste) => {
        this.requesteService.editTable(id, requeste.dataTables).subscribe(() => { 
            this.listTables()
        })
    })
  }
}

