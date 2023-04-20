import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RegisterTablesModel } from 'src/app/models/RegisterTablesModel';
import { RequestService } from '../../../services/request.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent {

  formTable!: FormGroup;
  title: string = "Cadastro"
  tableId!: number
  tables!: RegisterTablesModel[]

  event: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    public requestService: RequestService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {

    this.formTable = this.formBuilder.group(
      {
        capacity: [null, [Validators.required]],
        num:[null, [Validators.required]],
        description: ['', [Validators.required]]
      }
    )
  }
  ngAfterViewInit() {
    if (!!this.tableId) {

      this.requestService.getTableById(this.tableId).subscribe({
        next: (value) => {
          this.formTable.patchValue({
            ...value
          })
        },
        error(err) {
          console.error(err);
        },
        complete() {
          // this.loadingData = false
        }
      })
    }
  }
  
  newTable() {
    let dataTables = this.formTable.getRawValue() as RegisterTablesModel

    this.event.emit({ dataTables });
    this.modalService.hide()
  }
}
