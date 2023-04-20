import { Component, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { RequestService } from 'src/app/services/request.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-reservation',
  templateUrl: './confirm-reservation.component.html',
  styleUrls: ['./confirm-reservation.component.scss']
})
export class ConfirmReservationComponent {
  tableId!: number;
  date!: string;
  userId!: number

  closeEvent: EventEmitter<any> = new EventEmitter();


  constructor(
    public requestService: RequestService,
    public userService: UserService,
    private modalService: BsModalService
  ) { }

  get nameUser() {
    return this.userService.getUserName()
  }

  saveReserve() {
    return this.requestService
      .setReserve({tableId: this.tableId, date: this.date, userId: this.userId})
  }

  onCancel() {
    this.closeEvent.emit()
  }

  onConfirm(){
    this.saveReserve().subscribe(() => this.modalService.hide())
  }
}
