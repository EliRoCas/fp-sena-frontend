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
    const expenses = transactions.filter(t => t.transaction_type === 'expense' && new Date(t.transaction_date).getMonth() + 1);
    const incomes = transactions.filter(t => t.transaction_type === 'income' && new Date(t.transaction_date).getMonth() + 1);

    const totalExpenses = expenses.reduce((acc, t) => acc + t.transaction_amount, 0);
    const totalIncomes = incomes.reduce((acc, t) => acc + t.transaction_amount, 0);


    return {
      totalExpenses,
      totalIncomes
    }
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

    if ([1, 2, 3].includes(date.getMonth() + 1)) {
      return 'Q1'
    } else if ([4, 5, 6].includes(date.getMonth() + 1)) {
      return 'Q2'
    } else if ([7, 8, 9].includes(date.getMonth() + 1)) {
      return 'Q3'
    } else {
      return 'Q4'
    }
  }

  const getYearPeriod = (string_date: Date) => {
    return dayjs(string_date).year();
  };

  const currentYear = new Date().getFullYear();

  let transactionsNew: NetIncomeModel[] = [];

  ['Q1', 'Q2', 'Q3', 'Q4'].forEach(quarter => {

    const transactionByQuarter = transactions
      .filter(t => getPeriod(t.transaction_date) === quarter)
      .filter(t => getYearPeriod(t.transaction_date) === currentYear);

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

export const getIncomeStatement = createSelector(transactionAdapter.feature, (transactions) => {

  const getYearPeriod = (string_date: Date) => {
    return dayjs(string_date).year();
  };



  const transactionByYear = transactions
    .filter(t => getYearPeriod(t.transaction_date) === new Date().getFullYear());

  const incomesAll = transactionByYear
    .filter(t => t.transaction_type === 'income')
    .map(t => Number(t.transaction_amount))
    .reduce((prev, curr) => prev + curr, 0);

  const totalExpenses = transactionByYear
    .filter(t => t.transaction_type === 'expense')
    .map(t => Number(t.transaction_amount))
    .reduce((prev, curr) => prev + curr, 0);

  const roseExpenses = transactionByYear
    .filter(t => t.transaction_type === 'expense')
    .filter(t => Number(t.fo_category) === 3)
    .map(t => Number(t.transaction_amount))
    .reduce((prev, curr) => prev + curr, 0);

  const grossProfit = (incomesAll - totalExpenses) - roseExpenses;

  const salaries = transactionByYear
    .filter(t => t.transaction_type === "expense")
    .filter(t => Number(t.fo_category) === 12)
    .map(t => Number(t.transaction_amount))
    .reduce((prev, curr) => prev + curr, 0)

  const rent = transactionByYear
    .filter(t => t.transaction_type === "expense")
    .filter(t => Number(t.fo_category) === 13)
    .map(t => Number(t.transaction_amount))
    .reduce((prev, curr) => prev + curr, 0)

  const advertising = transactionByYear
    .filter(t => t.transaction_type === "expense")
    .filter(t => Number(t.fo_category) === 14)
    .map(t => Number(t.transaction_amount))
    .reduce((prev, curr) => prev + curr, 0)

  const otherExpenses = transactionByYear
    .filter(t => t.transaction_type === "expense")
    .filter(t => Number(t.fo_category) !== 3)
    .filter(t => Number(t.fo_category) !== 12)
    .filter(t => Number(t.fo_category) !== 13)
    .filter(t => Number(t.fo_category) !== 14)
    .map(t => Number(t.transaction_amount))
    .reduce((prev, curr) => prev + curr, 0)

  const totalOperatingExpenses = salaries + rent + advertising + otherExpenses;

  const taxes = (grossProfit - totalOperatingExpenses) * 0.35;

  return {
    totalIncome: incomesAll - totalExpenses,
    cogs: roseExpenses,
    grossProfit: grossProfit,
    operatingExpenses: {
      salaries: salaries,
      rent: rent,
      advertising: advertising,
      other: otherExpenses
    },
    totalOperatingExpenses: totalOperatingExpenses,
    taxes: taxes
  };

});





// Reporte de Gastos
export const getExpensesReport = createSelector(
  transactionAdapter.feature,
  (transactions: TransactionModel[]) => {
    const currentMonth = new Date().getMonth() + 1;
    const expenses = transactions.filter(t => t.transaction_type === 'expense' && new Date().getMonth() + 1 === currentMonth);
    return expenses;
  }
);

// Reporte de Ventas
export const getIncomesReport = createSelector(
  transactionAdapter.feature,
  (transactions: TransactionModel[]) => {
    const currentMonth = new Date().getMonth() + 1;

    const incomes = transactions.filter(t => t.transaction_type === 'income' && new Date().getMonth() + 1 === currentMonth);
    return incomes;
  }
);

// export const getIncomeStatements = createSelector(
//   transactionAdapter.feature,
//   (transactions: TransactionModel[]) => {
//     const incomes = transactions.filter(t => t.transaction_type === 'income');
//     const expenses = transactions.filter(t => t.transaction_type === 'expense');
//     return {
//       totalRevenue: incomes.reduce((acc, t) => acc + t.transaction_amount, 0),
//       totalExpenses: expenses.reduce((acc, t) => acc + t.transaction_amount, 0),
//       netIncome: incomes.reduce((acc, t) => acc + t.transaction_amount, 0) -
//         expenses.reduce((acc, t) => acc + t.transaction_amount, 0)
//     };
//   }
// );


// // Presupuesto de Operaciones
// export const getOperationalBudget = createSelector(
//   budgetAdapter.feature,
//   (budgets: BudgetModel[]) => {
//     return budgets.reduce((acc, b) => acc + b.amount, 0);
//   }
// );
