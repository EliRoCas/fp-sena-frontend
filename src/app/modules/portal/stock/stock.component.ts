import { Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { productAdapter, ProductModel } from '../../../services/products.service';
import { provideStore, provideState, Store } from '@ngrx/store';
import { FilterComponent } from '../../../share/filter/filter.component';


@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [MatTableModule, RouterLink, FilterComponent],
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

  }
}

