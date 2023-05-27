import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemProductoComponent } from './item-producto.component';

describe('ItemProductoComponent', () => {
  let component: ItemProductoComponent;
  let fixture: ComponentFixture<ItemProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
