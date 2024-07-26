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

  subcatForm: FormGroup;

  constructor(private store: Store, private _snackBar: MatSnackBar, private fb: FormBuilder) {
    this.subcatForm = this.fb.group({
      id_subcategory: [''],
      subcategory_name: ['', [Validators.required]],
      fo_category: [0, [Validators.required]]
    });

    effect(() => {

      if (this.id()) {
        this.store.select(subcatById(this.id()!))
          .pipe(
            filter(subcatData => !!subcatData)
          )
          .subscribe(subcatData => {

            this.subcatForm.patchValue(subcatData as any);

          })
      }
    });

  }

  ngOnInit(): void {
    this.store.dispatch(subcatAdapter.getAll());
    this.store.select(subcatAdapter.feature).subscribe(data => this.dataSource.set(data));

    this.store.select(subcatAdapter.selectById("2")).subscribe(data => this.selected.set(data));

    this.store.select(subcatByName('')).subscribe(result => {
      console.log('subcatByName', result)
    });

    this.store.dispatch(catAdapter.getAll());
    this.store.select(catAdapter.feature).subscribe(data => this.categories.set(data));
  };

  add() {
    if (this.id()) {

      this.store.dispatch(subcatAdapter.patchOne(this.subcatForm.value as unknown as SubcategoryModel,
        (data) => {
          this._snackBar.open("Datos guardados con éxito", "", { duration: 5000 })
        },
        (error) => {
          console.log(error);
          this._snackBar.open("ERROR","", { duration: 5000 })
        }
      ));

    } else {

      this.store.dispatch(subcatAdapter.addOne(this.subcatForm.value as unknown as SubcategoryModel,
        (data) => {
          this._snackBar.open("Datos guardados con éxito", "", { duration: 5000 })
          this.subcatForm.reset();
        },
        (error) => {
          console.log(error);

          this._snackBar.open("ERROR", "", { duration: 5000 })
        }
      ));
    }
  }

  delete(subcategory: SubcategoryModel) {
    this.store.dispatch(subcatAdapter.removeOne(subcategory))
  }


  parentCategories: string[] = [
    "Ventas", "Gastos", "Agroinsumo", "Servicios", "Salarios"];

}
