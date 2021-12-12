import { TestBed } from '@angular/core/testing';

import { FinancService } from './financ.service';

describe('FinancService', () => {
  let service: FinancService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinancService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
