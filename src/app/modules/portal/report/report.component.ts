import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BalanceComponent } from './balance/balance.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { PortalContentComponent } from '@ea-controls/portal';
import { getExpensesReport, getIncomesReport } from '../../../services/reports.service';
import { transactionAdapter } from '../../../services/transactions.service';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [BalanceComponent, RouterLink, CommonModule, PortalContentComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit {
  public baseMoney = signal<number | undefined>(undefined);
  public spentMoney = signal<number | undefined>(undefined);
  public lastIncomes = signal<string[]>([]);
  public lastExpenses = signal<string[]>([]);

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(transactionAdapter.getAll());

    // Se obtienen los últimos 3 egresos
    this.store.select(getExpensesReport).subscribe(expenses => {
      this.spentMoney.set(expenses.reduce((acc, expense) => acc + Number(expense.transaction_amount), 0));
      this.lastExpenses.set(expenses.slice(0, 3).map(expense => expense.transaction_name));
    });


    // Se obtienen los últimos tres ingresos
    this.store.select(getIncomesReport).subscribe(incomes => {
      this.baseMoney.set(incomes.reduce((acc, income) => acc + Number(income.transaction_amount), 0));
      this.lastIncomes.set(incomes.slice(0, 3).map(income => income.transaction_name));
    });
  }
}