import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterModel } from 'src/app/models/RegisterModel';
import { RegisterTablesModel } from 'src/app/models/RegisterTablesModel';
import { RequesteService } from 'src/app/services/requeste.service';

@Component({
  selector: 'app-edit-tables',
  templateUrl: './edit-tables.component.html',
  styleUrls: ['./edit-tables.component.scss']
})
export class EditTablesComponent {
  editTableForm!: FormGroup;
  tables!: RegisterTablesModel;
  id: number = +this.route.snapshot.params['id'];

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, public requesteService: RequesteService, private router: Router) { }

  ngOnInit() {
    this.editTableForm = this.formBuilder.group(
      {
        capacity: ['', [Validators.required]],
        status: ['']
      }
    )
  }


  editTable() {
    let datesTables = this.editTableForm.getRawValue() as RegisterModel

    this.requesteService.editTable(this.id, datesTables).subscribe({
      next: (value) => {
        this.tables = value
      },
      error(err) {
        console.error(err);
      },
    })
  }

}
