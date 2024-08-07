import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PortalContentComponent } from '@ea-controls/portal';
import { FilterComponent } from '../../../../share/filter/filter.component';
import { categoryData, parentCat, subcatAdapter,SubcategoryModel} from '../../../../services/subcategories.service';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule} from '@angular/forms';
import { catAdapter} from '../../../../services/categories.service';
import { MatDialog} from '@angular/material/dialog';
import { SubcategoryFormComponent } from './subcategory-form/subcategory-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../../../../environment';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [
    CommonModule,
    PortalContentComponent,
    MatTableModule,
    RouterLink,
    FilterComponent,
    ReactiveFormsModule, 
    MatExpansionModule
  ],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss'
})
export class SubcategoriesComponent {
  readonly panelOpenState = signal(false);
  isSmallScreen = false;

  displayedColumns: string[] = ['id_subcategory', 'subcategory_name', 'fo_category', 'subcatActions'];
  dataSource = signal<SubcategoryModel[]>([]);
  selected = signal<SubcategoryModel | undefined>(undefined);
  id = input<number | undefined>();
  categories = signal<categoryData[]>([]);
 
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private matDialog: MatDialog, 
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.store.dispatch(subcatAdapter.getAll());
    this.store.select(subcatAdapter.selectById("2")).subscribe(data => this.selected.set(data));

    this.store.dispatch(catAdapter.getAll());

    this.store.select(parentCat).subscribe(data => this.dataSource.set(data))
  
    const customBreakpoint = '(max-width: 800px)';
    this.breakpointObserver
      .observe([customBreakpoint])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
  };
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  delete(subcategory: SubcategoryModel) {
    this.store.dispatch(subcatAdapter.removeOne(subcategory))
  }

  openNewSubcategory() {
    this.matDialog.open(SubcategoryFormComponent);
  }

  editSubcategory(id: number): void {
    this.matDialog.open(SubcategoryFormComponent, {
      data: id
    });
  }

  apk(): boolean {
    if (environment.isMobile){
      return true; 
    }else {
      return false;
    }
  };
}
