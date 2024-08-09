import { CommonModule } from '@angular/common';
import { Component, input, signal, effect } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PortalContentComponent } from '@ea-controls/portal';
import { FilterComponent } from '../../../share/filter/filter.component';
import { catAdapter, catById, catByName, CategoryModel } from '../../../services/categories.service';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormComponent } from './category-form/category-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    PortalContentComponent,
    MatTableModule,
    RouterLink,
    FilterComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  displayedColumns: string[] = ['id_category', 'category_name', 'catActions'];
  dataSource = new MatTableDataSource<CategoryModel>();
  selected = signal<CategoryModel | undefined>(undefined);
  id = input<number | undefined>();
  filterValue = "";



  constructor(
    private store: Store,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.dispatch(catAdapter.getAll());
    this.store.select(catAdapter.feature).subscribe(data => this.dataSource.data = data);
  };

  delete(category: CategoryModel) {
    this.store.dispatch(catAdapter.removeOne(category))
  }

  openNewCategory() {
    this.matDialog.open(CategoryFormComponent);
  }

  editCategory(id: number): void {
    this.matDialog.open(CategoryFormComponent, {
      data: id
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
