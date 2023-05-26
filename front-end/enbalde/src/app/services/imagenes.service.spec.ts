import { TestBed } from '@angular/core/testing';

import { ImagenesService } from './imagenes.service';

describe('ImagenesService', () => {
  let service: ImagenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
