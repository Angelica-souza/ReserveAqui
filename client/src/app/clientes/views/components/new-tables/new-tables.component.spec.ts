import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTablesComponent } from './new-tables.component';

describe('NewTablesModalComponent', () => {
  let component: NewTablesComponent;
  let fixture: ComponentFixture<NewTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
