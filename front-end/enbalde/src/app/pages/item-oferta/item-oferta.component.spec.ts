import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOfertaComponent } from './item-oferta.component';

describe('ItemOfertaComponent', () => {
  let component: ItemOfertaComponent;
  let fixture: ComponentFixture<ItemOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemOfertaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
