import { TestBed } from '@angular/core/testing';

import { EnbaldePagoService } from './enbalde-pago.service';

describe('EnbaldePagoService', () => {
  let service: EnbaldePagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnbaldePagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
