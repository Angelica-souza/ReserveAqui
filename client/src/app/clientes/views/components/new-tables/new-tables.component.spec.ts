import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTablesComponent } from './new-tables.component';

describe('NewTablesModalComponent', () => {
  let component: NewTablesModalComponent;
  let fixture: ComponentFixture<NewTablesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTablesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTablesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
