import { TestBed } from '@angular/core/testing';

import { MissionTypeService } from './mission-type.service';

describe('MissionTypeService', () => {
  let service: MissionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MissionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
