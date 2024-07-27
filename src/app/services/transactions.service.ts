import { Injectable } from '@angular/core';

import { EntityAdapter } from '@ea-controls/ngrx-repository'; // Manejador de operaciones para entidades NGRX
import { createSelector } from '@ngrx/store'; // Función de la biblioteca NGRX para crar selectores de estado memorizados

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor() { }
}

export interface TransactionModel {
  id_transaction: number;
  transaction_name: string;
  transaction_rose_export: string;
  fo_rose_type: string;
  transaction_customer: string;
  transaction_date: Date;
  transaction_amount: number;
  transaction_description: string;
  transaction_type: string;
  fo_category: number;
  fo_subcategory: number;
}

export interface RoseModel {
  id_rose_type: number;
  rose_type_name: string;
}

export const transactionAdapter = new EntityAdapter<TransactionModel>("transactions", { getId: (input) => input.id_transaction.toString() });

export const roseTypeAdapter = new EntityAdapter<RoseModel>("rose_types", { getId: (input) => input.id_rose_type.toString() });

export const transactionByName = (name: string) => createSelector(transactionAdapter.feature,
  transactions => {
    return transactions.filter(trans => trans.transaction_name.toLowerCase().indexOf(name.toLocaleLowerCase()) > -1);
  })

export const transactionById = (id: number) => createSelector(transactionAdapter.feature,
  transactions => {
    return transactions.find(trans => trans.id_transaction === id);
  })

export const transactionByType = (transaction_type: string) => createSelector(transactionAdapter.feature,
  transactions => {
    return transactions.filter(trans => trans.transaction_type === transaction_type);
  })

export const transactionIncome = createSelector(transactionAdapter.feature,
  transactions => {
    return transactions.filter(trans => trans.transaction_type === 'income');
  })
  
export const transactionExpense = createSelector(transactionAdapter.feature,
  transactions => {
    return transactions.filter(trans => trans.transaction_type === 'expense');
  })


// export const transactionByDate = (date: Date) => createSelector(transactionAdapter.feature,
//   transactions => {
//     return transactions.filter(trans => trans.transaction_date === );
//   })