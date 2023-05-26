import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoApiComponent } from './resultado-api.component';

describe('ResultadoApiComponent', () => {
  let component: ResultadoApiComponent;
  let fixture: ComponentFixture<ResultadoApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
