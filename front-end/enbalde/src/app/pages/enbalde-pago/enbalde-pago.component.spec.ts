import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnbaldePagoComponent } from './enbalde-pago.component';

describe('EnbaldePagoComponent', () => {
  let component: EnbaldePagoComponent;
  let fixture: ComponentFixture<EnbaldePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnbaldePagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnbaldePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
