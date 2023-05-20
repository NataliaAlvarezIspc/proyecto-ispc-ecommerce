import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestablecerComponent } from './restablecer.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RestablecerComponent', () => {
  let component: RestablecerComponent;
  let fixture: ComponentFixture<RestablecerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestablecerComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestablecerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
