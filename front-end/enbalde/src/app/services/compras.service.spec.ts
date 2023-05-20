import { TestBed } from '@angular/core/testing';

import { ComprasService } from './compras.service';

describe('ComprasService', () => {
  let service: ComprasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
