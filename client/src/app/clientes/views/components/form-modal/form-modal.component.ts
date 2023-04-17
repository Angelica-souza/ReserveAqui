import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RegisterTablesModel } from 'src/app/models/RegisterTablesModel';
import { RequesteService } from 'src/app/services/requeste.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent {

  formTable!: FormGroup;
  title: string = "Cadastro"
  tableId!: number
  tableElement: any = null
  loadingData: boolean = false
  event: EventEmitter<any> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    public requesteService: RequesteService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {

    this.formTable = this.formBuilder.group(
      {
        capacity: ['', [Validators.required]],
        status: ['livre'],
        description: ['', [Validators.required]]
      }
    )
  }
  ngAfterViewInit() {
    if (!!this.tableId) {

      this.requesteService.getTableById(this.tableId).subscribe({
        next: (value) => {
          console.log(value)
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

    console.log(dataTables)

    this.event.emit({ dataTables });
    this.modalService.hide()
  }
}
