import { Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PortalContentComponent } from '@ea-controls/portal';
import { transactionAdapter, transactionExpense, TransactionModel } from '../../../services/transactions.service';
import { Store } from '@ngrx/store';

export interface expenseElement {
  id_expense: number;
  expense_name: string;
  expense_date: Date;
  expense_amount: number;
  rose_type: string;
  supplier: string;
}

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
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent {
  displayedColumns: string[] = [
    'id_transaction',
    'transaction_name',
    'transaction_date',
    'transaction_amount',
    'transaction_customer',
    'expenseActions',
  ];
  dataSource = signal<TransactionModel[]>([])
  selected = signal<TransactionModel | undefined>(undefined);

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(transactionAdapter.getAll());
    this.store.select(transactionExpense).subscribe(data => this.dataSource.set(data));

  }

  delete(transaction: TransactionModel) {
    this.store.dispatch(transactionAdapter.removeOne(transaction));
  }

}
