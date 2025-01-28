import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCreateModalComponent } from './expense-create-modal.component';

describe('ExpenseCreateModalComponent', () => {
  let component: ExpenseCreateModalComponent;
  let fixture: ComponentFixture<ExpenseCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
