import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProductoComponent } from './tipo-producto.component';

describe('TipoProductoComponent', () => {
  let component: TipoProductoComponent;
  let fixture: ComponentFixture<TipoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
