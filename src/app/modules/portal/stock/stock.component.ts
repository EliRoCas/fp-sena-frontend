import { Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { productAdapter, productByName, ProductModel } from '../../../services/products.service';
import { provideStore, provideState, Store } from '@ngrx/store';
import { FilterComponent } from '../../../share/filter/filter.component';
import { PortalContentComponent } from '@ea-controls/portal';


@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [MatTableModule, RouterLink, FilterComponent, PortalContentComponent],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent {
  displayedColumns: string[] = ['id_product', 'product_name', 'category', 'quantity', 'productActions'];
  dataSource = signal<ProductModel[]>([]);
  selected = signal<ProductModel | undefined>(undefined);

  endpoint = '/api/usuarios';
  filterFields = ['id', 'nombre'];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(productAdapter.getAll());
    this.store.select(productAdapter.feature).subscribe(data => this.dataSource.set(data));

    this.store.select(productAdapter.selectById("2")).subscribe(data => this.selected.set(data));

    this.store.select(productByName('')).subscribe(result => {
      console.log('productByName', result)
    })
  };

  delete(product: ProductModel) {
    this.store.dispatch(productAdapter.removeOne(product))
  }

}

