import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PortalContentComponent } from '@ea-controls/portal';
import { transactionAdapter, transactionIncome, TransactionModel } from '../../../services/transactions.service';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-incomes',
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
  templateUrl: './incomes.component.html',
  styleUrl: './incomes.component.scss'
})
export class IncomesComponent {
  displayedColumns: string[] = [
    'id_transaction',
    'transaction_name',
    'transaction_date',
    'transaction_amount',
    'fo_rose_type',
    'transaction_rose_export',
    'transaction_customer',
    'incomeActions'];
  dataSource = signal<TransactionModel[]>([])
  selected = signal<TransactionModel | undefined>(undefined);

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(transactionAdapter.getAll());
    this.store.select(transactionIncome).subscribe(data => this.dataSource.set(data));

    //this.store.select(transactionIncome).subscribe;
  }

  delete(transaction: TransactionModel) {
    this.store.dispatch(transactionAdapter.removeOne(transaction));
  }
}

