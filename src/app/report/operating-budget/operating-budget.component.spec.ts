import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingBudgetComponent } from './operating-budget.component';

describe('OperatingBudgetComponent', () => {
  let component: OperatingBudgetComponent;
  let fixture: ComponentFixture<OperatingBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatingBudgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatingBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
