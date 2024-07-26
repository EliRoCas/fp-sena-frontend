import { CommonModule } from '@angular/common';
import { Component, input, signal, effect } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PortalContentComponent } from '@ea-controls/portal';
import { FilterComponent } from '../../../share/filter/filter.component';
import { catAdapter, catById, catByName, CategoryModel } from '../../../services/categories.service';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    PortalContentComponent,
    MatTableModule,
    RouterLink,
    FilterComponent,
    ReactiveFormsModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  displayedColumns: string[] = ['id_category', 'category_name', 'subcategories', 'catActions'];
  dataSource = signal<CategoryModel[]>([]);
  selected = signal<CategoryModel | undefined>(undefined);
  id = input<number | undefined>();
  catForm: FormGroup;



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


  add() {
    if (this.id()) {
      this.store.dispatch(catAdapter.patchOne(this.catForm.value as unknown as CategoryModel,
        (data) => {
          this._snackBar.open("Datos guardados con éxito", "", { duration: 5000 })
        },
        (error) => {
          this._snackBar.open("Error", "", { duration: 5000 })
        }
      ));
    } else {
      this.store.dispatch(catAdapter.addOne(this.catForm.value as unknown as CategoryModel,
        (data) => {
          this._snackBar.open("Datos guardados con éxito", "", { duration: 5000 })
          this.catForm.reset();
        },
        (error) => {
          this._snackBar.open("ERROR", "", { duration: 5000 })
        }
      ));
    }
  }
  constructor(private store: Store, private _snackBar: MatSnackBar, private fb: FormBuilder) {
    this.catForm = this.fb.group({
      id_category: [''],
      category_name: ['', [Validators.required]],
    },
    );
    effect(() => {

      if (this.id()) {
        this.store.select(catById(this.id()!))
          .pipe(
            filter(catData => !!catData)
          )
          .subscribe(catData => {

            this.catForm.patchValue(catData as any);

          })
      }
    });
  }

}
