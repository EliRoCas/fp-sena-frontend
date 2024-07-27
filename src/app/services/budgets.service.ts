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
  
}