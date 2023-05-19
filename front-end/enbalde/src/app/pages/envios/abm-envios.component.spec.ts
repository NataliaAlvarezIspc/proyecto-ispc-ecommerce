import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbmEnviosComponent } from './abm-envios.component';

describe('AbmEnviosComponent', () => {
  let component: AbmEnviosComponent;
  let fixture: ComponentFixture<AbmEnviosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbmEnviosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbmEnviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
