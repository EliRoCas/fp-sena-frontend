import { CommonModule } from '@angular/common';
import { Component, effect, input, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PortalContentComponent } from '@ea-controls/portal';
import { FilterComponent } from '../../../../share/filter/filter.component';
import { subcatAdapter, subcatById, subcatByName, SubcategoryModel } from '../../../../services/subcategories.service';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { catAdapter, CategoryModel } from '../../../../services/categories.service';
import {
  MatDialog,
  MatDialogClose,
} from '@angular/material/dialog';
import { SubcategoryFormComponent } from './subcategory-form/subcategory-form.component';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [
    CommonModule,
    PortalContentComponent,
    MatTableModule,
    RouterLink,
    FilterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss'
})
export class SubcategoriesComponent {

  displayedColumns: string[] = ['id_subcategory', 'subcategory_name', 'fo_category', 'subcatActions'];
  dataSource = signal<SubcategoryModel[]>([]);
  selected = signal<SubcategoryModel | undefined>(undefined);
  id = input<number | undefined>();
  categories = signal<CategoryModel[]>([]);

  constructor(private store: Store,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.store.dispatch(subcatAdapter.getAll());
    this.store.select(subcatAdapter.feature).subscribe(data => this.dataSource.set(data));

    this.store.select(subcatAdapter.selectById("2")).subscribe(data => this.selected.set(data));

    // this.store.select(subcatByName('')).subscribe(result => {
    //   console.log('subcatByName', result)
    // });

    this.store.dispatch(catAdapter.getAll());
    this.store.select(catAdapter.feature).subscribe(data => this.categories.set(data));
  };


  delete(subcategory: SubcategoryModel) {
    this.store.dispatch(subcatAdapter.removeOne(subcategory))
  }

  openNewCategory() {
    this.matDialog.open(SubcategoryFormComponent);
  }


  editCategory(id: number): void {
    this.matDialog.open(SubcategoryFormComponent, {
      data: id
    });
  }
}
