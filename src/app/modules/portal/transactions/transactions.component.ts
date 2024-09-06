import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PortalContentComponent } from '@ea-controls/portal';
import {
  catAdapter,
  CategoryModel,
} from '../../../services/categories.service';
import {
  getSubcatByCatId,
  subcatAdapter,
  SubcategoryModel,
} from '../../../services/subcategories.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import {
  RoseModel,
  roseTypeAdapter,
  transactionAdapter,
  transactionById,
  TransactionModel,
} from '../../../services/transactions.service';
import { filter, take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { Guid } from 'guid-typescript';
import { CategoryFormComponent } from '../categories/category-form/category-form.component';
import { SubcategoryFormComponent } from '../categories/subcategories/subcategory-form/subcategory-form.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    PortalContentComponent,
    MatIconModule,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent implements OnInit {
  id?: number;
  private sub: any;
  categories = signal<CategoryModel[]>([]);
  selectedCat = signal<CategoryModel | undefined>(undefined);
  subcategories = signal<SubcategoryModel[]>([]);
  selectedSubca = signal<SubcategoryModel | undefined>(undefined);
  roseTypes = signal<RoseModel[]>([]);
  selectedRoseType = signal<RoseModel | undefined>(undefined);

  transactionForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store,
    private _snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {
    this.transactionForm = this.fb.group({
      id_transaction: [Guid.create().toString()],
      transaction_name: ['', [Validators.required, Validators.minLength(3)]],
      transaction_rose_export: [''],
      fo_rose_type: [null],
      transaction_customer: [''],
      transaction_date: [[new Date()], [Validators.required]],
      transaction_amount: [0, [Validators.required]],
      transaction_description: [''],
      transaction_type: ['', [Validators.required]],
      fo_category: [null, [Validators.required]],
      fo_subcategory: [null],
    });

    this.transactionForm
      .get('fo_category')
      ?.valueChanges.subscribe((newValue) => {
        this.store
          .select(getSubcatByCatId(newValue))
          .pipe(take(1))
          .subscribe((data) => this.subcategories.set(data));
      });
  }

  add() {
    if (this.id) {
      this.store.dispatch(
        transactionAdapter.patchOne(
          this.transactionForm.value as unknown as TransactionModel,
          (data) => {
            this._snackBar.open('Datos guardados con éxito', '', {
              duration: 5000,
            });
          },
          (error) => {
            this._snackBar.open('ERROR', '', { duration: 5000 });
          }
        )
      );
    } else {
      this.store.dispatch(
        transactionAdapter.addOne(
          this.transactionForm.value as unknown as TransactionModel,
          (data) => {
            this._snackBar.open('Datos guardados con éxito', '', {
              duration: 5000,
            });
            this.transactionForm.reset();
          },
          (error) => {
            this._snackBar.open('ERROR', '', { duration: 5000 });
          }
        )
      );
    }
  }

  ngOnInit(): void {
    this.store.dispatch(transactionAdapter.getAll());

    this.store.dispatch(catAdapter.getAll());
    this.store.select(catAdapter.feature).subscribe((data) => {
      this.categories.set(data);
      // console.log(data)
    });
    this.store.dispatch(subcatAdapter.getAll());
    this.store.dispatch(roseTypeAdapter.getAll());
    this.store
      .select(roseTypeAdapter.feature)
      .subscribe((data) => this.roseTypes.set(data));

    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.store
          .select(transactionById(this.id!))
          .pipe(filter((transactionData) => !!transactionData))
          .subscribe((transactionData) => {
            this.transactionForm.patchValue(transactionData as any);
          });
      }
    });
  }

  openNewCategory() {
    this.matDialog.open(CategoryFormComponent);
  }
  openNewSubcategory() {
    this.matDialog.open(SubcategoryFormComponent);
  }
}
