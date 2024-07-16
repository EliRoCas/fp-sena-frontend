import { Component } from '@angular/core';

@Component({
  selector: 'app-operating-budget',
  standalone: true,
  imports: [],
  templateUrl: './operating-budget.component.html',
  styleUrl: './operating-budget.component.scss'
})
export class OperatingBudgetComponent {
  operatingBudget = {
    totalIncome: 120000,
    cogs: 50000,
    operatingExpenses: {
      salaries: 20000,
      rent: 6000,
      supplies: 4000,
      advertising: 3000,
      other: 2000
    },
    otherExpenses: {
      interest: 600,
      depreciation: 800,
      amortization: 400
    },
    otherIncomes: {
      investmentIncome: 1500,
      nonOperatingGains: 2500
    },
    taxes: 10000
  };

  // Se calcula la Ganancia Bruta 
  get grossProfit() {
    return this.operatingBudget.totalIncome - this.operatingBudget.cogs;
  }

  // Se calcula el total de los Gastos Operativos 
  get totalOperatingExpenses() {
    const expenses = this.operatingBudget.operatingExpenses;
    return Object.values(expenses).reduce((a, b) => a + b, 0);
  }

  // Se calcula el Ingreso Operativo (EBIT)
  get operatingIncome() {
    return this.grossProfit - this.totalOperatingExpenses;
  }

  // Se calcula el total de Otros Gastos 
  get totalOtherExpenses() {
    const expenses = this.operatingBudget.otherExpenses;
    return Object.values(expenses).reduce((a, b) => a + b, 0);
  }

  // Se calcula el total de Otros Ingresos
  get totalOtherIncomes() {
    const incomes = this.operatingBudget.otherIncomes;
    return Object.values(incomes).reduce((a, b) => a + b, 0);
  }

  // Se calculan los ingresos antes de los impuestos 
  get incomeBeforeTaxes() {
    return this.operatingIncome - this.totalOtherExpenses + this.totalOtherIncomes;
  }

  // Se calcula el ingreso neto 
  get netIncome() {
    return this.incomeBeforeTaxes - this.operatingBudget.taxes;
  }
}
