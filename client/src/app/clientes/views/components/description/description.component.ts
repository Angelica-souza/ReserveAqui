import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ReserveComponent } from '../reserve/reserve.component';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {
  reserveModalRef!: BsModalRef;
  user: string = "Angélica"

  constructor(
    private modalService: BsModalService
  ){}

  onReserve(){
    this.modalService.show(ReserveComponent, { class: 'modal-sm'})
  }
}
