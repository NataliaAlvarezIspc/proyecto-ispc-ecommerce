import { TestBed } from '@angular/core/testing';

import { EnviosService } from './envios.service';

describe('EnviosService', () => {
  let service: EnviosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
