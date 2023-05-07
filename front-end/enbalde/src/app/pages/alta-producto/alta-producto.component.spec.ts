import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaProductoComponent } from './alta-producto.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AltaProductoComponent', () => {
  let component: AltaProductoComponent;
  let fixture: ComponentFixture<AltaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaProductoComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
