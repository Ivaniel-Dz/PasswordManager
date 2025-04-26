import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaDetailComponent } from './tarjeta-detail.component';

describe('TarjetaDetailComponent', () => {
  let component: TarjetaDetailComponent;
  let fixture: ComponentFixture<TarjetaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
