import { Component } from '@angular/core';

import { RegisterTablesModel } from 'src/app/models/RegisterTablesModel';
import { RequestService } from '../../../../services/request.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent {
  capacity!: number[];

  constructor(private requestService: RequestService) { }

  ngOnInit() {

    this.listOfSeatsTable()
  }

  listOfSeatsTable() {
    //Usar a função find para pegar o primeiro valor que tenha a quatidade de lugares pedida
    let tables!: RegisterTablesModel[];

    this.requestService.getTables().subscribe({
      next: (value) => {
        //Aqui eu quero filtrar o valor da capacity por status livre e quero que não venha valores repetidos 
        tables = value;

        console.log(tables)

        console.log(tables.reduce<RegisterTablesModel[]>((acc, current) => {
          const hasRepeat = acc.find((item) => item.capacity === current.capacity && current.status !== 'ocupado')
          if (hasRepeat) return acc
  
          acc.push(current)
          return acc  
        }, []))
      }
    })
  }
}