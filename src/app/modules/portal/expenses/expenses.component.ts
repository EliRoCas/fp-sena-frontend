import { Component, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PortalContentComponent } from '@ea-controls/portal';
import {
  transactionAdapter,
  transactionExpense,
  TransactionModel,
} from '../../../services/transactions.service';
import { Store } from '@ngrx/store';
import {
  BreakpointObserver,
  Breakpoints,
  LayoutModule,
} from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [
    MatTableModule,
    RouterLink,
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
    PortalContentComponent,
    MatExpansionModule,
    CommonModule,
    LayoutModule,
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent {
  readonly panelOpenState = signal(false);
  isSmallScreen = false;

  displayedColumns: string[] = [
    // 'id_transaction',
    'transaction_name',
    'transaction_date',
    'transaction_amount',
    'transaction_customer',
    'expenseActions',
  ];
  dataSource = new MatTableDataSource<TransactionModel>();
  selected = signal<TransactionModel | undefined>(undefined);

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.store.dispatch(transactionAdapter.getAll());
    this.store
      .select(transactionExpense)
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
  delete(transaction: TransactionModel) {
    this.store.dispatch(transactionAdapter.removeOne(transaction));
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  printTable() {
    window.print();
  }
}
