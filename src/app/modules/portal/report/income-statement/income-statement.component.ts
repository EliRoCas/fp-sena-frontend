import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-income-statement',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './income-statement.component.html',
  styleUrl: './income-statement.component.scss'
})
export class IncomeStatementComponent {

  incomeStatement = {
    totalIncome: 100000,
    cogs: 40000,
    operatingExpenses: {
      salaries: 15000,
      rent: 5000,
      supplies: 3000,
      advertising: 2000,
      other: 1000
    },
    otherExpenses: {
      interest: 500,
      depreciation: 700,
      amortization: 300
    },
    otherIncomes: {
      investmentIncome: 1000,
      nonOperatingGains: 2000
    },
    taxes: 8000
  };

  //Se calcula la ganancia bruta
  get grossProfit() {
    return this.incomeStatement.totalIncome - this.incomeStatement.cogs;
  }

  //Se calcula el total de gastos operativos 
  get totalOperatingExpenses() {
    const expenses = this.incomeStatement.operatingExpenses;
    return Object.values(expenses).reduce((a, b) => a + b, 0);
  }

  // Se calcula el ingreso Operativo restando los gastos operativos totales
  get operatingIncome() {
    return this.grossProfit - this.totalOperatingExpenses;
  }

  //Se calcula el total de gastos 
  get totalOtherExpenses() {
    const expenses = this.incomeStatement.otherExpenses;
    return Object.values(expenses).reduce((a, b) => a + b, 0);
  }

  //Se calcula el total de ingresos
  get totalOtherIncomes() {
    const incomes = this.incomeStatement.otherIncomes;
    return Object.values(incomes).reduce((a, b) => a + b, 0);
  }

  // Se calcula el ingreso antes de los impuestos 
  get incomeBeforeTaxes() {
    return this.operatingIncome - this.totalOtherExpenses + this.totalOtherIncomes;
  }

  // Se calcula ell ingreso neto 
  get netIncome() {
    return this.incomeBeforeTaxes - this.incomeStatement.taxes;
  }
}
