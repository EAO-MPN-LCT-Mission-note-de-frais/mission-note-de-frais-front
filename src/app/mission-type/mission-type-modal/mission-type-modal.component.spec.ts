import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionTypeModalComponent } from './mission-type-modal.component';

describe('MissionTypeModalComponent', () => {
  let component: MissionTypeModalComponent;
  let fixture: ComponentFixture<MissionTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionTypeModalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MissionTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
