import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ReserveComponent } from '../reserve/reserve.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent {
  reserveModalRef!: BsModalRef;
  user!: string

  constructor(
    private modalService: BsModalService,
    private useService: UserService
  ){}

  ngOnInit(){
    this.user = this.useService.getUserName() as string
  }

  onReserve(){
    this.modalService.show(ReserveComponent, { class: 'modal-lg'})
  }
}
