import { Component } from '@angular/core';

import { RegisterTablesModel } from 'src/app/models/RegisterTablesModel';
import { RequestService } from '../../../../services/request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent {
  isMeridian = false;
  readonly = true;
  myTime = new Date()

  hoje: Date = new Date();

  bsConfig = {
    dateInputFormat: 'DD/MM/YYYY',
    minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  };

  tables!: RegisterTablesModel[];
  reserveTable!: FormGroup;
  capacity!: number[];

  constructor(
    private requestService: RequestService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.listOfSeatsTable()

    this.reserveTable = this.formBuilder.group(
      {
        capacity: ['', [Validators.required]],
        date: [''],
        time: ['', [Validators.required]]
      }
    )

  }

  listOfSeatsTable() {
    //Usar a função find para pegar o primeiro valor que tenha a quatidade de lugares pedida

    this.requestService.getTables().subscribe({
      next: (value: RegisterTablesModel[]) => {
        console.log(this.tables = this.filterTablesCapacityStatus(value));
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

  onConfimReserva() {
    console.log("oi")
  }

}