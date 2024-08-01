import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  constructor() { }
}

import { EntityAdapter } from '@ea-controls/ngrx-repository'; // Manejador de operaciones para entidades NGRX
import { createSelector } from '@ngrx/store'; // Función de la biblioteca NGRX para crar selectores de estado memorizados
import { catAdapter } from './categories.service';
import { retry } from 'rxjs';

export interface SubcategoryModel {
  id_subcategory: number;
  subcategory_name: string;
  fo_category: number;
}

export const subcatAdapter = new EntityAdapter<SubcategoryModel>("subcategories", { getId: (input) => input.id_subcategory.toString(), additionalData: { id: "id_subcategory" } });

export const subcatByName = (name: string) => createSelector(subcatAdapter.feature,
  subcategories => {
    return subcategories.filter(subcat => subcat.subcategory_name.toLowerCase().indexOf(name.toLowerCase()) > -1);
  })

export const subcatById = (id: number) => createSelector(subcatAdapter.feature,
  subcategories => {
    return subcategories.find(subcat => subcat.id_subcategory === id);
  })

// export const assignSubcat = createSelector(
//   catAdapter.feature,
//   subcatAdapter.feature,
//   (categories, subcategories) => {
//     return categories.map(cat => {
//       const subcategory = subcategories
//         .filter(subcat => subcat.id_subcategory === cat.fo_subcategory)
//     })
//   }
// )