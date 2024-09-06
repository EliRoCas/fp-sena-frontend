import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  Inject,
  input,
  Optional,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PortalContentComponent } from '@ea-controls/portal';

import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SubcategoryModel } from '../../../../services/subcategories.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import {
  catAdapter,
  CategoryModel,
  catById,
} from '../../../../services/categories.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    PortalContentComponent,
    MatTableModule,
    RouterLink,

    ReactiveFormsModule,
    MatDialogClose,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent {
  //id = input<number | undefined>();
  categories = signal<SubcategoryModel[]>([]);

  catForm: FormGroup;

  constructor(
    private store: Store,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    @Optional() public dialogRef: MatDialogRef<any>,
    @Optional() @Inject(MAT_DIALOG_DATA) public id?: number
  ) {
    this.catForm = this.fb.group({
      id_category: [Guid.create().toString()],
      category_name: ['', [Validators.required]],
    });

    effect(() => {
      if (this.id) {
        this.store
          .select(catById(this.id!))
          .pipe(filter((catData) => !!catData))
          .subscribe((catData) => {
            this.catForm.patchValue(catData as any);
          });
      }
    });
  }

  add() {
    if (this.id) {
      this.store.dispatch(
        catAdapter.patchOne(
          this.catForm.value as unknown as CategoryModel,
          (data) => {
            this._snackBar.open('Datos guardados con éxito', '', {
              duration: 5000,
            });
            this.dialogRef.close();
          },
          (error) => {
            this._snackBar.open('Error', '', { duration: 5000 });
          }
        )
      );
    } else {
      this.store.dispatch(
        catAdapter.addOne(
          this.catForm.value as unknown as CategoryModel,
          (data) => {
            this._snackBar.open('Datos guardados con éxito', '', {
              duration: 5000,
            });
            this.catForm.reset();
            this.dialogRef?.close();
            this.store.dispatch(catAdapter.getAll());
          },
          (error) => {
            // console.log(error)
            this._snackBar.open('¡Upps! Algo salió mal.', '', {
              duration: 5000,
            });
          }
        )
      );
    }
  }
}
