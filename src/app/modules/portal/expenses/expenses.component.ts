import { Component, signal} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PortalContentComponent } from '@ea-controls/portal';
import { transactionAdapter, transactionExpense, TransactionModel } from '../../../services/transactions.service';
import { Store } from '@ngrx/store';

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
  dataSource = new MatTableDataSource<TransactionModel>()
  selected = signal<TransactionModel | undefined>(undefined);

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(transactionAdapter.getAll());
    this.store.select(transactionExpense).subscribe(data => this.dataSource.data = data);

  }

  delete(transaction: TransactionModel) {
    this.store.dispatch(transactionAdapter.removeOne(transaction));
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  };

  printTable() {
    window.print();
  }

}
