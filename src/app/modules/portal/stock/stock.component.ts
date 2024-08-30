import { Component, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { productAdapter, productByName, ProductCategory, ProductModel, selectProductsWithCategories } from '../../../services/products.service';
import { provideStore, provideState, Store } from '@ngrx/store';
import { FilterComponent } from '../../../share/filter/filter.component';
import { PortalContentComponent } from '@ea-controls/portal';
import { catAdapter, CategoryModel } from '../../../services/categories.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { environment } from '../../../../../environment';


@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    MatTableModule,
    RouterLink,
    FilterComponent,
    PortalContentComponent,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    CommonModule,
    LayoutModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent {
  readonly panelOpenState = signal(false);
  isSmallScreen = false;

  displayedColumns: string[] = ['id_product', 'product_name', 'category', 'quantity', 'productActions'];
  dataSource = new MatTableDataSource<ProductCategory>();
  selected = signal<ProductModel | undefined>(undefined);
  categories = signal<CategoryModel[]>([]);
  selecter = signal<CategoryModel | undefined>(undefined)

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.store.dispatch(productAdapter.getAll());
    // this.store.select(productAdapter.feature).subscribe(data => this.dataSource.data = data);
    this.store.dispatch(catAdapter.getAll());
    this.store.select(selectProductsWithCategories).subscribe(data => this.dataSource.data = data);

    this.store.select(productAdapter.selectById("2")).subscribe(data => this.selected.set(data));

    // this.store.select(productByName('')).subscribe(data => this.dataSource.data = data);

    const customBreakpoint = '(max-width: 800px)';
    this.breakpointObserver
      .observe([customBreakpoint])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  delete(product: ProductModel) {
    this.store.dispatch(productAdapter.removeOne(product))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  printTable() {
    window.print();
  }

  apk(): boolean {
    if (environment.isMobile){
      return true; 
    }else {
      return false;
    }
  };

}

