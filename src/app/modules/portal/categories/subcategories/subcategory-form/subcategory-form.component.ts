import { CommonModule } from '@angular/common';
import { Component, effect, Inject, input, Optional, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PortalContentComponent } from '@ea-controls/portal';
import { FilterComponent } from '../../../../../share/filter/filter.component';
import { catAdapter, CategoryModel } from '../../../../../services/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { subcatAdapter, subcatById, SubcategoryModel } from '../../../../../services/subcategories.service';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-subcategory-form',
  standalone: true,
  imports: [
    CommonModule,
    PortalContentComponent,
    MatTableModule,
    RouterLink,
    FilterComponent,
    ReactiveFormsModule,
    MatDialogClose
  ],
  templateUrl: './subcategory-form.component.html',
  styleUrl: './subcategory-form.component.scss'
})
export class SubcategoryFormComponent {

  categories = signal<CategoryModel[]>([]);

  subcatForm: FormGroup;

  constructor(private store: Store,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<any>, 
    @Optional() @Inject(MAT_DIALOG_DATA) public id?: number) {
    

    this.subcatForm = this.fb.group({
      id_subcategory: [Guid.create().toString()],
      subcategory_name: ['', [Validators.required]],
      fo_category: [null, [Validators.required]]
    });

    effect(() => {
      if (this.id) {
        this.store.select(subcatById(this.id!))
          .pipe(
            filter(subcatData => !!subcatData)
          )
          .subscribe(subcatData => {
            this.subcatForm.patchValue(subcatData as any);
          })
      }
    });

  }

  add() {
    if (this.id) {
      this.store.dispatch(subcatAdapter.patchOne(this.subcatForm.value as unknown as SubcategoryModel,
        (data) => {
          this._snackBar.open("Datos guardados con éxito", "", { duration: 5000 })
          this.dialogRef.close();
        },
        (error) => {
          // console.log(error);
          this._snackBar.open("¡Upps! Algo salió mal.", "", { duration: 5000 })
        }
      ));

    } else {
      this.store.dispatch(subcatAdapter.addOne(this.subcatForm.value as unknown as SubcategoryModel,
        (data) => {
          this._snackBar.open("Datos guardados con éxito", "", { duration: 5000 })
          this.subcatForm.reset();
          this.dialogRef?.close();
          this.store.dispatch(subcatAdapter.getAll());

        },
        (error) => {
          // console.log(error);
          this._snackBar.open("¡Upps! Algo salió mal.", "", { duration: 5000 })
        }
      ));
    }
  }

  ngOnInit(): void {
    this.store.dispatch(catAdapter.getAll());
    this.store.select(catAdapter.feature).subscribe(data => this.categories.set(data));
  }
}
