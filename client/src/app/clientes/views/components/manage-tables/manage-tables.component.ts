import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { RegisterTablesModel } from 'src/app/models/RegisterTablesModel';


import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RequestService } from '../../../../services/request.service';
import { UserService } from '../../../../services/user.service';
import { ConfirmDeleteModalComponent } from '../../../components/confirm-delete-modal/confirm-delete-modal.component';
import { FormModalComponent } from '../../../components/form-modal/form-modal.component';

@Component({
  selector: 'app-manage-tables',
  templateUrl: './manage-tables.component.html',
  styleUrls: ['./manage-tables.component.scss']
})
export class ManageTablesComponent {
  tables!: RegisterTablesModel[];

  deleteModal!: BsModalRef<ConfirmDeleteModalComponent>;
  formModal!: BsModalRef<FormModalComponent>;

  isNoTable!: boolean

  // @ViewChild(FormModalComponent) edit!: FormModalComponent

  constructor(
    public userService: UserService,
    public requestService: RequestService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.listTables();
    this.isVisible();

  }

  isVisible() {
    if (!this.userService.getAdmin()) this.router.navigate(['']);
  }

  listTables() {
    this.requestService.getTables().subscribe({
      next: (value) => {
        value && value.length > 0 ? this.isNoTable = false : this.isNoTable = true
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
      console.log(value.tableId)
      this.requestService.delTables(value.tableId).subscribe({
        next: (value) => {
          this.listTables()
        },
        error: (error) => {
          console.error(error)
        }
      })
    })
  }

  formTable() {
    this.formModal = this.modalService.show(FormModalComponent, { class: 'modal-sm' })
    this.formModal.content?.event.subscribe((requeste) => {
      this.requestService.setTables(requeste.dataTables).subscribe({
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
      this.requestService.editTable(id, requeste.dataTables).subscribe(() => {
        this.listTables()
      })
    })
  }
}

