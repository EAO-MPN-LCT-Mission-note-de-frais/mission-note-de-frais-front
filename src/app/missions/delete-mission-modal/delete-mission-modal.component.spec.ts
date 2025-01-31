import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMissionModalComponent } from './delete-mission-modal.component';

describe('DeleteMissionModalComponent', () => {
  let component: DeleteMissionModalComponent;
  let fixture: ComponentFixture<DeleteMissionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteMissionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMissionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
