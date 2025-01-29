import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTypeManagementComponent } from './expense-type-management.component';

describe('ExpenseTypeManagementComponent', () => {
  let component: ExpenseTypeManagementComponent;
  let fixture: ComponentFixture<ExpenseTypeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseTypeManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
