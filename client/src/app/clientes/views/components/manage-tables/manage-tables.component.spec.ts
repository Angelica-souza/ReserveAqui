import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTablesComponent } from './manage-tables.component';

describe('ManageTablesComponent', () => {
  let component: ManageTablesComponent;
  let fixture: ComponentFixture<ManageTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
