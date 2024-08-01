import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetsService {

  constructor() { }
}


import { EntityAdapter } from '@ea-controls/ngrx-repository'; // Manejador de operaciones para entidades NGRX
import { createSelector } from '@ngrx/store'; // Función de la biblioteca NGRX para crar selectores de estado memorizados

export interface BudgetModel {
  id_product: number;
  budget_date: string;
  amount: number;
  fo_category: number;
  description_budget: string;
}

export const budgetAdapter = new EntityAdapter<BudgetModel>("products", { getId: (input) => input.id_product.toString(), additionalData: { id: "id_product" } });

export const budgetByDate = (name: string) => createSelector(budgetAdapter.feature,
  budgets => {
    return budgets.filter(b => b.budget_date);
  })

export const budgetById = (id: number) => createSelector(budgetAdapter.feature,
  budgets => {
    return budgets.find(b => b.id_product === id);
  })