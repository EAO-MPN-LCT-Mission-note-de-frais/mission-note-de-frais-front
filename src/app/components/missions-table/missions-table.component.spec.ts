import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsTableComponent } from './missions-table.component';

describe('MissionsTableComponent', () => {
  let component: MissionsTableComponent;
  let fixture: ComponentFixture<MissionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
