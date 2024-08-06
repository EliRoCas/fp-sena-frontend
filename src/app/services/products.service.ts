import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }
}

import { EntityAdapter } from '@ea-controls/ngrx-repository'; // Manejador de operaciones para entidades NGRX
import { createSelector } from '@ngrx/store'; // Función de la biblioteca NGRX para crar selectores de estado memorizados
import { catAdapter, CategoryModel } from './categories.service';

export interface ProductModel {
  id_product: number;
  product_name: string;
  fo_subcategory: string;
  product_img: string;
  product_description: string;
  quantity: number;
  fo_category: number;
}

export const productAdapter = new EntityAdapter<ProductModel>("products", { getId: (input) => input.id_product.toString(), additionalData: { id: "id_product" } });

export const productByName = (name: string) => createSelector(productAdapter.feature,
  products => {
    return products.filter(p => p.product_name.toLowerCase().indexOf(name.toLocaleLowerCase()) > -1);
  })

export const productById = (id: number) => createSelector(productAdapter.feature,
  products => {
    return products.find(p => p.id_product === id);
  })

export const selectProductsWithCategories = createSelector(
  productAdapter.feature,
  catAdapter.feature,
  (products: ProductModel[], categories: CategoryModel[]) => {
    return products.map(product => {
      const category = categories.find(cat => cat.id_category === product.fo_category);
      return {
        ...product,
        category_name: category ? category.category_name : 'Categoría no asignada'
      };
    });
  }
);