import { Injectable } from '@angular/core';

import { createSelector, Store } from '@ngrx/store';
import { budgetAdapter, BudgetModel } from './budgets.service';
import { transactionAdapter, TransactionModel } from './transactions.service';


@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private store: Store) { }

  // Balance: gastos y ventas ingresados
  getBalanceReport() {
    return createSelector(
      transactionAdapter.feature,
      (transactions: TransactionModel[]) => {
        const expenses = transactions.filter(t => t.transaction_type === 'expense');
        const incomes = transactions.filter(t => t.transaction_type === 'income');
        return {
          totalExpenses: expenses.reduce((acc, t) => acc + t.transaction_amount, 0),
          totalIncomes: incomes.reduce((acc, t) => acc + t.transaction_amount, 0),
        };
      }
    );
  }

  // Estado de resultados
  getIncomeStatement() {
    return createSelector(
      transactionAdapter.feature,
      (transactions: TransactionModel[]) => {
        const incomes = transactions.filter(t => t.transaction_type === 'income');
        const expenses = transactions.filter(t => t.transaction_type === 'expense');
        return {
          totalRevenue: incomes.reduce((acc, t) => acc + t.transaction_amount, 0),
          totalExpenses: expenses.reduce((acc, t) => acc + t.transaction_amount, 0),
          netIncome: incomes.reduce((acc, t) => acc + t.transaction_amount, 0) -
            expenses.reduce((acc, t) => acc + t.transaction_amount, 0)
        };
      }
    );
  }

  // Utilidad Neta
  getNetIncome() {
    return createSelector(
      transactionAdapter.feature,
      (transactions: TransactionModel[]) => {
        const incomes = transactions.filter(t => t.transaction_type === 'income');
        const expenses = transactions.filter(t => t.transaction_type === 'expense');
        return incomes.reduce((acc, t) => acc + t.transaction_amount, 0) -
          expenses.reduce((acc, t) => acc + t.transaction_amount, 0);
      }
    );
  }

  // Presupuesto de Operaciones
  getOperationalBudget() {
    return createSelector(
      budgetAdapter.feature,
      (budgets: BudgetModel[]) => {
        return budgets.reduce((acc, b) => acc + b.amount, 0);
      }
    );
  }

  // Reporte de Gastos
  getExpensesReport() {
    return createSelector(
      transactionAdapter.feature,
      (transactions: TransactionModel[]) => {
        return transactions.filter(t => t.transaction_type === 'expense');
      }
    );
  }

  // Reporte de Ventas
  getIncomesReport() {
    return createSelector(
      transactionAdapter.feature,
      (transactions: TransactionModel[]) => {
        return transactions.filter(t => t.transaction_type === 'income');
      }
    );
  }
}
