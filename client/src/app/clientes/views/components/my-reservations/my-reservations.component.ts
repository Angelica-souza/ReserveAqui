import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmDeleteModalComponent } from 'src/app/clientes/components/confirm-delete-modal/confirm-delete-modal.component';
import { ReserveTableModel } from 'src/app/models/ReserveTableModel';
import { RequestService } from 'src/app/services/request.service';
import { UserService } from 'src/app/services/user.service';
import { ReserveComponent } from '../reserve/reserve.component';


@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss'],
})
export class MyReservationsComponent {
  reserves!: ReserveTableModel[];
  reserveModal!: BsModalRef;
  deleteModal!: BsModalRef<ConfirmDeleteModalComponent>

  isNoTable!: boolean

  constructor(
    private requestService: RequestService, 
    private modalService: BsModalService,
    private userService: UserService
  ){}

  ngOnInit(){
    this.listReserves()
  }

  listReserves() {
    const id = this.userService.getIdUser()

    this.requestService.getReservesWithTableByUser(id).subscribe({
      next: (values) => {

        values && values.length > 0 ? this.isNoTable = false : this.isNoTable = true
        this.reserves = values
        
      },
      error(err) {
        console.error("errors");
      }
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

    this.delete();
  }

  delete() {
    this.deleteModal.content?.event.subscribe((value) => {
        this.requestService.delReserve(value.tableId).subscribe((res) => {
          this.listReserves()
        })
    })
  }

  onReserve(){
    this.modalService.show(ReserveComponent, { class: 'modal-lg'})
  }
}
