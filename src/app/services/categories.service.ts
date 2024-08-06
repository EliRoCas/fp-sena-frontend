import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }
}

import { EntityAdapter } from '@ea-controls/ngrx-repository'; // Manejador de operaciones para entidades NGRX
import { createSelector } from '@ngrx/store'; // Función de la biblioteca NGRX para crar selectores de estado memorizados

export interface CategoryModel {
  id_category: number;
  category_name: string;
}

export const catAdapter = new EntityAdapter<CategoryModel>("categories", { getId: (input) => input.id_category.toString(), additionalData: { id: "id_category" } });

export const catByName = (name: string) => createSelector(catAdapter.feature,
  categories => {
    return categories.filter(cat => cat.category_name.toLowerCase().indexOf(name.toLowerCase()) > -1);
  })

export const catById = (id: number) => createSelector(catAdapter.feature,
  categories => {
    return categories.find(cat => cat.id_category === id);
  })
