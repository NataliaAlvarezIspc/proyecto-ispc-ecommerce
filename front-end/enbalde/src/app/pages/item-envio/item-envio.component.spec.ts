import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEnvioComponent } from './item-envio.component';

describe('ItemEnvioComponent', () => {
  let component: ItemEnvioComponent;
  let fixture: ComponentFixture<ItemEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemEnvioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
