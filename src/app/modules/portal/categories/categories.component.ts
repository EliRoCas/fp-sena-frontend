import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PortalContentComponent } from '@ea-controls/portal';
import { FilterComponent } from '../../../share/filter/filter.component';
import { catAdapter, catByName, CategoryModel } from '../../../services/categories.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    PortalContentComponent,
    MatTableModule,
    RouterLink,
    FilterComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  displayedColumns: string[] = ['id_category', 'category_name', 'subcategories', 'catActions'];
  dataSource = signal<CategoryModel[]>([]);
  selected = signal<CategoryModel | undefined>(undefined);


  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(catAdapter.getAll());
    this.store.select(catAdapter.feature).subscribe(data => this.dataSource.set(data));

    this.store.select(catAdapter.selectById("2")).subscribe(data => this.selected.set(data));

    this.store.select(catByName('')).subscribe(result => {
      console.log('catByName', result)
    })
  };

  delete(category: CategoryModel) {
    this.store.dispatch(catAdapter.removeOne(category))
  }

}
