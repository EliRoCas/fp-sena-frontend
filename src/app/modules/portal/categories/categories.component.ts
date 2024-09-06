import { CommonModule } from '@angular/common';
import { Component, input, signal, effect } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PortalContentComponent } from '@ea-controls/portal';

import {
  catAdapter,
  CategoryModel,
} from '../../../services/categories.service';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormComponent } from './category-form/category-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../../../../../environment';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    PortalContentComponent,
    MatTableModule,
    RouterLink,

    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  readonly panelOpenState = signal(false);
  isSmallScreen = false;

  displayedColumns: string[] = ['category_name', 'catActions'];
  dataSource = new MatTableDataSource<CategoryModel>();
  selected = signal<CategoryModel | undefined>(undefined);
  id = input<number | undefined>();
  filterValue = '';

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private matDialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.store.dispatch(catAdapter.getAll());
    this.store
      .select(catAdapter.feature)
      .subscribe((data) => (this.dataSource.data = data));

    const customBreakpoint = '(max-width: 800px)';
    this.breakpointObserver
      .observe([customBreakpoint])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  delete(category: CategoryModel) {
    this.store.dispatch(catAdapter.removeOne(category));
  }

  openNewCategory() {
    this.matDialog.open(CategoryFormComponent);
  }

  editCategory(id: number): void {
    this.matDialog.open(CategoryFormComponent, {
      data: id,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  apk(): boolean {
    if (environment.isMobile) {
      return true;
    } else {
      return false;
    }
  }
}
