import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashBalcaoComponent } from './dash-balcao.component';

describe('DashBalcaoComponent', () => {
  let component: DashBalcaoComponent;
  let fixture: ComponentFixture<DashBalcaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashBalcaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashBalcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
