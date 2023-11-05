import { TestBed } from '@angular/core/testing';

import { SubtemasService } from './subtemas.service';

describe('SubtemasService', () => {
  let service: SubtemasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubtemasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
