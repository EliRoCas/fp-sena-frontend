import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PortalContentComponent } from '@ea-controls/portal';
import { Store } from '@ngrx/store';
import { getIncomeStatement } from '../../../../services/reports.service';
import { transactionAdapter } from '../../../../services/transactions.service';

@Component({
  selector: 'app-income-statement',
  standalone: true,
  imports: [
    MatButtonModule,
    PortalContentComponent
  ],
  templateUrl: './income-statement.component.html',
  styleUrl: './income-statement.component.scss'
})
export class IncomeStatementComponent {

  incomeStatement: any;

  constructor(private store: Store) {

    this.store.dispatch(transactionAdapter.getAll());

    this.store.select(getIncomeStatement).subscribe(data => {
      this.incomeStatement = data;
    })
  }

  //Se calcula la ganancia bruta
  get grossProfit() {
    return this.incomeStatement.totalIncome - this.incomeStatement.cogs;
  }

  //Se calcula el total de gastos operativos 
  get totalOperatingExpenses() {
    return this.incomeStatement.totalOperatingExpenses
  }

  // Se calcula el ingreso Operativo restando los gastos operativos totales
  get operatingIncome() {
    return this.grossProfit - this.totalOperatingExpenses;
  }

  // Se calcula el ingreso antes de los impuestos 
  get incomeBeforeTaxes() {
    return this.operatingIncome
  }

  // Se calcula ell ingreso neto 
  get netIncome() {
    return this.incomeBeforeTaxes - this.incomeStatement.taxes;
  }

  printTable() {
    window.print();
  }
}
