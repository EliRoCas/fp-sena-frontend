import { Injectable } from '@angular/core';

import { createSelector } from '@ngrx/store';
import { budgetAdapter, BudgetModel } from './budgets.service';
import { transactionAdapter, TransactionModel } from './transactions.service';

// import * as dayjs from 'dayjs'
import dayjs from 'dayjs'

dayjs().format()

// @Injectable({
//   providedIn: 'root'
// })
// export class ReportsService {
//   constructor() { }
// }

// Balance: gastos y ventas ingresados
export const getBalanceReport = createSelector(
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

// Utilidad Neta 
export interface NetIncomeModel {
  period: string;
  incomes: number;
  expenses: number;
  netIncome: number;
}
export const getPeriodReportData = createSelector(transactionAdapter.feature, (transactions) => {

  const getPeriod = (string_date: Date) => {
    const date = dayjs(string_date).toDate();

    if ([1, 2, 3].includes(date.getMonth())) {
      return 'Q1'
    } else if ([4, 5, 6].includes(date.getMonth())) {
      return 'Q2'
    } else if ([7, 8, 9].includes(date.getMonth())) {
      return 'Q3'
    } else {
      return 'Q4'
    }
  }

  let transactionsNew: NetIncomeModel[] = [];

  ['Q1', 'Q2', 'Q3', 'Q4'].forEach(quarter => {

    const transactionByQuarter = transactions
      .filter(t => getPeriod(t.transaction_date) === quarter);

    const totalIncomes = transactionByQuarter
      .filter(t => t.transaction_type === 'income')
      .map(t => Number(t.transaction_amount))
      .reduce((prev, curr) => prev + curr, 0);

    const totalExpenses = transactionByQuarter
      .filter(t => t.transaction_type === 'expense')
      .map(t => Number(t.transaction_amount))
      .reduce((prev, curr) => prev + curr, 0);

    transactionsNew.push({
      period: quarter,
      incomes: totalIncomes,
      expenses: totalExpenses,
      netIncome: totalIncomes - totalExpenses
    })

  });

  return transactionsNew;
})



// Estado de resultados
export const getIncomeStatement = createSelector(
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


// Presupuesto de Operaciones
export const getOperationalBudget = createSelector(
  budgetAdapter.feature,
  (budgets: BudgetModel[]) => {
    return budgets.reduce((acc, b) => acc + b.amount, 0);
  }
);


// Reporte de Gastos
export const getExpensesReport = createSelector(
  transactionAdapter.feature,
  (transactions: TransactionModel[]) => {
    return transactions.filter(t => t.transaction_type === 'expense');
  }
);

// Reporte de Ventas
export const getIncomesReport = createSelector(
  transactionAdapter.feature,
  (transactions: TransactionModel[]) => {
    return transactions.filter(t => t.transaction_type === 'income');
  }
);

