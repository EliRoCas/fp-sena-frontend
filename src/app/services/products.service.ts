// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductsService {

//   constructor() { }
// }

import { EntityAdapter } from '@ea-controls/ngrx-repository'; // Manejador de operaciones para entidades NGRX
import { createSelector } from '@ngrx/store'; // Función de la biblioteca NGRX para crar selectores de estado memorizados

export interface ProductModel {
  id_product: number;
  product_name: string;
  product_type: string;
  product_img: string;
  product_description: string;
  quantity: number;
  fo_category: number;
}

export interface CategoryModel {
  id_category: number;
  category_name: string;
}

export const productAdapter = new EntityAdapter<ProductModel>("products", (input) => input.id_product.toString());
export const catAdapter = new EntityAdapter<CategoryModel>("categories", (input) => input.id_category.toString());


export const productByName = (name: string) => createSelector(productAdapter.feature,
  products => {
    return products.filter(p => p.product_name.toLowerCase().indexOf(name.toLocaleLowerCase()) > -1);
  })

export const productById = (id: number) => createSelector(productAdapter.feature,
  products => {
    return products.find(p => p.id_product === id);
  })