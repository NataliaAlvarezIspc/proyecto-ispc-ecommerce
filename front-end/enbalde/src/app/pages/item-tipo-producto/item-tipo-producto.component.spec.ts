import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTipoProductoComponent } from './item-tipo-producto.component';

describe('ItemTipoProductoComponent', () => {
  let component: ItemTipoProductoComponent;
  let fixture: ComponentFixture<ItemTipoProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTipoProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTipoProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
