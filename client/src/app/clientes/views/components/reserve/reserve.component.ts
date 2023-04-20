import { Component } from '@angular/core';

import { RegisterTablesModel } from 'src/app/models/RegisterTablesModel';
import { RequestService } from '../../../../services/request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DateTime } from 'luxon'

import { ConfirmReservationComponent } from 'src/app/clientes/components/confirm-reservation/confirm-reservation.component';
import { ReservationModel } from 'src/app/models/ReservationModel';
import { Data } from '@angular/router';
import { TableReservesModel } from 'src/app/models/TableReservesModel';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent {
  reserveTable!: FormGroup;
  filterCapacity!: RegisterTablesModel[];
  table!: RegisterTablesModel[]
  selectedTable!: RegisterTablesModel;
  message!: string;

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
    private modalService: BsModalService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.listOfSeatsTable()

    this.reserveTable = this.formBuilder.group(
      {
        capacity: ['', [Validators.required]],
        date: ['', [Validators.required]]
      }
    )

  }

  listOfSeatsTable() {
    this.requestService.getTables().subscribe({
      next: (value: RegisterTablesModel[]) => {
        this.filterCapacity = this.filterTablesCapacityStatus(value);
      }
    })
  }

  filterTablesCapacityStatus(value: RegisterTablesModel[]) {
    return value.reduce<RegisterTablesModel[]>((acc, current) => {
      if (!acc.some((item) => item.capacity === current.capacity)) {
        acc.push(current);
      }
      return acc;
    }, [])
  }

  onSelectTable() {
    this.message = '';

    const { date, capacity } = this.reserveTable.getRawValue() as ReservationModel

    const monthISO = `${date.getMonth() + 1}`.padStart(2, '0')
    const fullDateISO = `${date.getFullYear()}-${monthISO}-${date.getDate()}`
    
    this.requestService.getTablesWithReserves(capacity).subscribe((values) => {
      const tableId = this.selectAvailableTableId(fullDateISO, values);

      if (tableId === -1) {
        this.message = `Não temos mais mesas de ${capacity} lugares para este dia`
        return
      }

      this.openConfirm(tableId, fullDateISO)
    })

  }

  selectAvailableTableId(date: string, tables: TableReservesModel[]) {
    const selectedDate = DateTime.fromISO(date)

    for (const table of tables) {
      const isUnavailable = table.reserves.some((reserve) => {
        const reservedDate = DateTime.fromISO(reserve.date)
        return selectedDate.equals(reservedDate)
      })

      if (isUnavailable) continue
      return table.id
    }

    return -1
  }

  openConfirm(tableId: number, date: string) {
    const userId = this.userService.getIdUser()

    const modalRef = this.modalService.show(
      ConfirmReservationComponent,
      {
        class: 'modal-sm',
        initialState: {
          tableId: tableId,
          date: date,
          userId
        }
      }
    );

    modalRef.content?.closeEvent
      .subscribe(() => this.modalService.hide(modalRef.id))
  }


  onCancel() {
    this.modalService.hide();
  }
}