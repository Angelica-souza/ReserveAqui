import { Component } from '@angular/core';

import { RegisterTablesModel } from 'src/app/models/RegisterTablesModel';
import { RequestService } from '../../../../services/request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmReservationComponent } from 'src/app/clientes/components/confirm-reservation/confirm-reservation.component';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent {
  reserveTable!: FormGroup;
  tables!: RegisterTablesModel[];
  selectedTable!: RegisterTablesModel;

  //Config de date e time
  hoje: Date = new Date();
  bsConfig = {
    dateInputFormat: 'DD/MM/YYYY',
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  };


  constructor(
    private requestService: RequestService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.listOfSeatsTable()

    this.reserveTable = this.formBuilder.group(
      {
        capacity: ['', [Validators.required]],
        date: ['', [Validators.required]],
        time: ['', [Validators.required]]
      }
    )

  }

  listOfSeatsTable() {
    this.requestService.getTables().subscribe({
      next: (value: RegisterTablesModel[]) => {
        this.tables = this.filterTablesCapacityStatus(value);
      }
    })
  }

  filterTablesCapacityStatus(value: RegisterTablesModel[]) {
    return value.reduce<RegisterTablesModel[]>((acc, current) => {
      if (current.status !== "ocupado" && !acc.some((item) => item.capacity === current.capacity)) {
        acc.push(current);
      }
      return acc;
    }, [])
  }

  openConfirm() {
    this.modalService.show(
      ConfirmReservationComponent,
      {
        class: 'modal-sm',
        // initialState: {
        //   tableId: id
        // }
      }
    );
  }

  onSelectTable() {
    //verificar na tabela de reservas se na data informada tem mesa com a quantidade pedida de lugares
    this.requestService.getTables().subscribe({
      next: (value: RegisterTablesModel[]) => {
        const selectedTable = this.selectTableCapacityStatus(value);
        if (selectedTable) {
          this.selectedTable = selectedTable;
        } else {
          // tratamento para o caso de não haver uma mesa selecionada
        }
      }
    })

    this.openConfirm()
  }

  selectTableCapacityStatus(value: RegisterTablesModel[]) {
    let dataReserve = this.reserveTable.getRawValue() as RegisterTablesModel

    return value.find(item => item.capacity === dataReserve.capacity && item.status !== 'ocupado')
  }


  onCancel() {
    this.modalService.hide();
  }
}