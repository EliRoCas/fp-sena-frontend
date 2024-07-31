import { CommonModule } from '@angular/common';
import { Component, effect, input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PortalContentComponent } from '@ea-controls/portal';
import { catAdapter, CategoryModel } from '../../../../services/categories.service';
import { subcatAdapter, SubcategoryModel } from '../../../../services/subcategories.service';
import { Store } from '@ngrx/store';
import { productAdapter, productById, ProductModel } from '../../../../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogClose,
} from '@angular/material/dialog';
import { CategoryFormComponent } from '../../categories/category-form/category-form.component';
import { SubcategoryFormComponent } from '../../categories/subcategories/subcategory-form/subcategory-form.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PortalContentComponent,
    MatIconModule,
    RouterLink,
    CategoryFormComponent,
    SubcategoryFormComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {

  id?: number;
  categories = signal<CategoryModel[]>([]);
  selectedCat = signal<CategoryModel | undefined>(undefined);
  subcategories = signal<SubcategoryModel[]>([]);
  selectedSubca = signal<SubcategoryModel | undefined>(undefined);
  imageUrl: string | ArrayBuffer | null = null;
  private sub: any;

  productForm: FormGroup;


  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store,
    private _snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {
    this.productForm = this.fb.group({
      id_product: [''],
      product_name: ['', [Validators.required, Validators.minLength(3)]],
      fo_subcategory: [null],
      product_img: [''],
      product_description: [''],
      quantity: ['', [Validators.required]],
      fo_category: [null, [Validators.required]],
    });

    this.productForm.get("fo_category")?.valueChanges.subscribe(newValue => {
      const subcat = this.categories().find(c => c.id_category === newValue)?.subcategories ?? [];
      this.subcategories.set(subcat);
    })

  }

  ngOnInit() {
    this.store.dispatch(productAdapter.getAll());

    this.store.dispatch(catAdapter.getAll());
    this.store.select(catAdapter.feature).subscribe(data => this.categories.set(data));

    this.store.dispatch(subcatAdapter.getAll());
    this.store.select(subcatAdapter.feature).subscribe(data => this.subcategories.set(data));

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.store.select(productById(this.id!))
          .pipe(
            filter(productData => !!productData)
          )
          .subscribe(productData => {

            this.productForm.patchValue(productData as any);

          })
      }

    });
  }

  add() {
    if (this.id) {

      this.store.dispatch(productAdapter.patchOne(this.productForm.value as unknown as ProductModel,
        (data) => {
          this._snackBar.open("Datos guardados con éxito", "", { duration: 5000 })
        },
        (error) => {
          this._snackBar.open("¡Upps! Algo salió mal.", "", { duration: 5000 })
        }
      ));

    } else {

      this.store.dispatch(productAdapter.addOne(this.productForm.value as unknown as ProductModel,
        (data) => {
          this._snackBar.open("Datos guardados con éxito", "", { duration: 5000 })
          this.productForm.reset();
        },
        (error) => {
          this._snackBar.open("¡Upps! Algo salió mal.", "", { duration: 5000 });
          console.log(error)
        }
      ));
    }
  }




  title = signal<string>('Registrar Producto');

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  openNewCategory() {
    this.matDialog.open(CategoryFormComponent);
  }
  openNewSubcategory() {
    this.matDialog.open(SubcategoryFormComponent);
  }
}
