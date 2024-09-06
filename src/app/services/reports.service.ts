import { createSelector } from '@ngrx/store';
import { transactionAdapter, TransactionModel } from './transactions.service';

// import * as dayjs from 'dayjs'
import dayjs from 'dayjs';

dayjs().format();

// Balance: gastos y ventas ingresados
export const getBalanceReport = createSelector(
  transactionAdapter.feature,
  (transactions: TransactionModel[]) => {
    const expenses = transactions
      .filter((t) => t.transaction_type === 'expense')
      .filter(
        (t) =>
          dayjs(t.transaction_date).toDate().getMonth() ===
          new Date().getMonth()
      )
      .map((t) => Number(t.transaction_amount))
      .reduce((prev, curr) => prev + curr, 0);
    const incomes = transactions
      .filter((t) => t.transaction_type === 'income')
      .filter(
        (t) =>
          dayjs(t.transaction_date).toDate().getMonth() ===
          new Date().getMonth()
      )
      .map((t) => Number(t.transaction_amount))
      .reduce((prev, curr) => prev + curr, 0);

    return {
      expenses,
      incomes,
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
export const getPeriodReportData = createSelector(
  transactionAdapter.feature,
  (transactions) => {
    const getPeriod = (string_date: Date) => {
      const date = dayjs(string_date).toDate();

      if ([1, 2, 3].includes(date.getMonth() + 1)) {
        return 'Q1';
      } else if ([4, 5, 6].includes(date.getMonth() + 1)) {
        return 'Q2';
      } else if ([7, 8, 9].includes(date.getMonth() + 1)) {
        return 'Q3';
      } else {
        return 'Q4';
      }
    };

    const getYearPeriod = (string_date: Date) => {
      return dayjs(string_date).year();
    };

    const currentYear = new Date().getFullYear();

    let transactionsNew: NetIncomeModel[] = [];

    ['Q1', 'Q2', 'Q3', 'Q4'].forEach((quarter) => {
      const transactionByQuarter = transactions
        .filter((t) => getPeriod(t.transaction_date) === quarter)
        .filter((t) => getYearPeriod(t.transaction_date) === currentYear);

      const totalIncomes = transactionByQuarter
        .filter((t) => t.transaction_type === 'income')
        .map((t) => Number(t.transaction_amount))
        .reduce((prev, curr) => prev + curr, 0);

      const totalExpenses = transactionByQuarter
        .filter((t) => t.transaction_type === 'expense')
        .map((t) => Number(t.transaction_amount))
        .reduce((prev, curr) => prev + curr, 0);

      transactionsNew.push({
        period: quarter,
        incomes: totalIncomes,
        expenses: totalExpenses,
        netIncome: totalIncomes - totalExpenses,
      });
    });

    return transactionsNew;
  }
);

// Estado de resultados
export const getIncomeStatement = createSelector(
  transactionAdapter.feature,
  (transactions) => {
    const getYearPeriod = (string_date: Date) => {
      return dayjs(string_date).year();
    };

    const transactionByYear = transactions.filter(
      (t) => getYearPeriod(t.transaction_date) === new Date().getFullYear()
    );

    const incomesAll = transactionByYear
      .filter((t) => t.transaction_type === 'income')
      .map((t) => Number(t.transaction_amount))
      .reduce((prev, curr) => prev + curr, 0);

    const totalExpenses = transactionByYear
      .filter((t) => t.transaction_type === 'expense')
      .map((t) => Number(t.transaction_amount))
      .reduce((prev, curr) => prev + curr, 0);

    const roseExpenses = transactionByYear
      .filter((t) => t.transaction_type === 'expense')
      .filter((t) => Number(t.fo_category) === 1)
      .map((t) => Number(t.transaction_amount))
      .reduce((prev, curr) => prev + curr, 0);

    const grossProfit = incomesAll - totalExpenses - roseExpenses;

    const salaries = transactionByYear
      .filter((t) => t.transaction_type === 'expense')
      .filter((t) => Number(t.fo_category) === 2)
      .map((t) => Number(t.transaction_amount))
      .reduce((prev, curr) => prev + curr, 0);

    const rent = transactionByYear
      .filter((t) => t.transaction_type === 'expense')
      .filter((t) => Number(t.fo_category) === 4)
      .map((t) => Number(t.transaction_amount))
      .reduce((prev, curr) => prev + curr, 0);

    const advertising = transactionByYear
      .filter((t) => t.transaction_type === 'expense')
      .filter((t) => Number(t.fo_category) === 3)
      .map((t) => Number(t.transaction_amount))
      .reduce((prev, curr) => prev + curr, 0);

    const otherExpenses = transactionByYear
      .filter((t) => t.transaction_type === 'expense')
      .filter((t) => Number(t.fo_category) !== 1)
      .filter((t) => Number(t.fo_category) !== 2)
      .filter((t) => Number(t.fo_category) !== 3)
      .filter((t) => Number(t.fo_category) !== 4)
      .map((t) => Number(t.transaction_amount))
      .reduce((prev, curr) => prev + curr, 0);

    const totalOperatingExpenses =
      salaries + rent + advertising + otherExpenses;

    const taxes = (grossProfit - totalOperatingExpenses) * 0.35;

    return {
      totalIncome: incomesAll - totalExpenses,
      cogs: roseExpenses,
      grossProfit: grossProfit,
      operatingExpenses: {
        salaries: salaries,
        rent: rent,
        advertising: advertising,
        other: otherExpenses,
      },
      totalOperatingExpenses: totalOperatingExpenses,
      taxes: taxes,
    };
  }
);

// Reporte de Gastos
export const getExpensesReport = createSelector(
  transactionAdapter.feature,
  (transactions: TransactionModel[]) => {
    const expenses = transactions
      .filter((t) => t.transaction_type === 'expense')
      .filter(
        (t) =>
          dayjs(t.transaction_date).toDate().getMonth() ===
          new Date().getMonth()
      );
    return expenses;
  }
);

// Reporte de Ventas
export const getIncomesReport = createSelector(
  transactionAdapter.feature,
  (transactions: TransactionModel[]) => {
    const incomes = transactions
      .filter((t) => t.transaction_type === 'income')
      .filter(
        (t) =>
          dayjs(t.transaction_date).toDate().getMonth() ===
          new Date().getMonth()
      );
    return incomes;
  }
);
