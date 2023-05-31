import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemUsuarioComponent } from './item-usuario.component';

describe('ItemUsuarioComponent', () => {
  let component: ItemUsuarioComponent;
  let fixture: ComponentFixture<ItemUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
