import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashGeralComponent } from './dash-geral.component';

describe('DashGeralComponent', () => {
  let component: DashGeralComponent;
  let fixture: ComponentFixture<DashGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashGeralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
