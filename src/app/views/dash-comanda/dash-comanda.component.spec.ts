import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashComandaComponent } from './dash-comanda.component';

describe('DashComandaComponent', () => {
  let component: DashComandaComponent;
  let fixture: ComponentFixture<DashComandaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashComandaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashComandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
