import { Component, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { productAdapter, productByName, ProductModel, selectProductsWithCategories } from '../../../services/products.service';
import { provideStore, provideState, Store } from '@ngrx/store';
import { FilterComponent } from '../../../share/filter/filter.component';
import { PortalContentComponent } from '@ea-controls/portal';
import { catAdapter, CategoryModel } from '../../../services/categories.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    MatTableModule, 
    RouterLink, 
    FilterComponent, 
    PortalContentComponent, 
    MatFormFieldModule, 
    MatInputModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent {
  displayedColumns: string[] = ['id_product', 'product_name', 'category', 'quantity', 'productActions'];
  dataSource = new MatTableDataSource<ProductModel>();
  selected = signal<ProductModel | undefined>(undefined);
  categories = signal<CategoryModel[]>([]);
  selecter = signal<CategoryModel | undefined>(undefined)


  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(productAdapter.getAll());
    this.store.select(productAdapter.feature).subscribe(data => this.dataSource.data = data);
    this.store.dispatch(catAdapter.getAll());
    this.store.select(selectProductsWithCategories).subscribe(data => this.dataSource.data = data);


    this.store.select(productAdapter.selectById("2")).subscribe(data => this.selected.set(data));

    this.store.select(productByName('')).subscribe(data => this.dataSource.data = data);
  };

  delete(product: ProductModel) {
    this.store.dispatch(productAdapter.removeOne(product))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

