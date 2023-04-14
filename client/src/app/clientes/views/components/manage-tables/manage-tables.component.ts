import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { RegisterTablesModel } from 'src/app/models/RegisterTablesModel';


import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RequesteService } from '../../../../services/requeste.service';
import { UserService } from '../../../../services/user.service';

// type TableResponse = {
//   id: number;
//   capacity: number;
//   status: string;
// }

@Component({
  selector: 'app-manage-tables',
  templateUrl: './manage-tables.component.html',
  styleUrls: ['./manage-tables.component.scss']
})
export class ManageTablesComponent {
  formModalRef?: BsModalRef;
  tables!: RegisterTablesModel[];
  componentVisible = false;
  componentEditVisible = false

  @ViewChild('formModal') formModel!: TemplateRef<any> 


  constructor(
    public userService: UserService,
    public requesteService: RequesteService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.listTables();

    this.manegeVisible();
  }

  // ngAfterViewInit() {
    
  //   console.log(this.formModel)
    
  //   console.log(this.formModel.elementRef.nativeElement)
  // }

  listTables() {
    this.requesteService.getTables().subscribe({
      next: (value) => {
        this.tables = value
      },
      error(err) {
        console.error("errors");
      },
    })
  }

  deleteTable(tables: payload<any></any>) {

  }

  confirm(id: number){
    this.requesteService.delTables(id).subscribe({
      next: (value) => {
        location.reload();
      },
      error(err) {
        console.error("errors");
      },
    })
  }

  // showNewComponent() {
  //   this.componentVisible = true;
  // }

  // showEditComponent() {
  //   this.componentEditVisible = true;
  // }

  manegeVisible() {
    if (!this.userService.getAdmin()) this.router.navigate(['']);
  }

  // editTable() {
  //   this.showEditComponent();
  // }
}

