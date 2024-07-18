import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetIncomeComponent } from './net-income.component';

describe('NetIncomeComponent', () => {
  let component: NetIncomeComponent;
  let fixture: ComponentFixture<NetIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetIncomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
