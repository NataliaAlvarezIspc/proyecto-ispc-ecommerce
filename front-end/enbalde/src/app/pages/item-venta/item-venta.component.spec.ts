import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemVentaComponent } from './item-venta.component';

describe('ItemVentaComponent', () => {
  let component: ItemVentaComponent;
  let fixture: ComponentFixture<ItemVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
