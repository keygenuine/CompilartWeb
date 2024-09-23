import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashDeliveryComponent } from './dash-delivery.component';

describe('DashDeliveryComponent', () => {
  let component: DashDeliveryComponent;
  let fixture: ComponentFixture<DashDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashDeliveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
