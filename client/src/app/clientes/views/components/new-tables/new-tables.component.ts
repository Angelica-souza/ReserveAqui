import { Component } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterModel } from 'src/app/clientes/models/RegisterModel';
import { RequesteService } from 'src/app/clientes/services/requeste.service';

@Component({
  selector: 'app-new-tables',
  templateUrl: './new-tables.component.html',
  styleUrls: ['./new-tables.component.scss']
})
export class NewTablesComponent {
  newTableForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, public requesteService: RequesteService, private router: Router) { }

  ngOnInit() {
    this.newTableForm = this.formBuilder.group(
      {
        capacity: ['', [Validators.required]],
        status: ['livre']
      }
    )
  }

  
  newTable() {
    let datesTables = this.newTableForm.getRawValue() as RegisterModel

    this.requesteService.setTables(datesTables).subscribe({
      next: (value) => {
        console.log(value)

        location.reload();
      },
      error(err) {
        console.error("errors");
      },
    })
  }





}
