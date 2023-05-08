import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracionComponent } from './registracion.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RegistracionComponent', () => {
  let component: RegistracionComponent;
  let fixture: ComponentFixture<RegistracionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistracionComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
