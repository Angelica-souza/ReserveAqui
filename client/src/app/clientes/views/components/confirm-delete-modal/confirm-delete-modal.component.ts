import { Component, EventEmitter,  } from '@angular/core';
import {  BsModalService, } from 'ngx-bootstrap/modal';
import { RequesteService } from 'src/app/services/requeste.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent {
  tableId!: number;
  event: EventEmitter<{ tableId: number }> = new EventEmitter();

  constructor(
    // public userService: UserService,
    // public requesteService: RequesteService,
    private modalService: BsModalService
  ) { }

  onConfirmDelete() {
    this.event.emit({tableId: this.tableId})
    this.modalService.hide()
  }

  onDeclineDelete() {
    this.modalService.hide();
  }
}
