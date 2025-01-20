import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionTypeComponent } from './mission-type.component';

describe('MissionTypeComponent', () => {
  let component: MissionTypeComponent;
  let fixture: ComponentFixture<MissionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
