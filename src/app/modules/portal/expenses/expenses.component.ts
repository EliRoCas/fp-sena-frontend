import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

export interface expenseElement {
  id_expense: number;
  expense_name: string;
  expense_date: Date;
  expense_amount: number;
  rose_type: string;
  supplier: string;
}

const ELEMENT_DATA: expenseElement[] = [
  {
    id_expense: 1,
    expense_name: 'Venta Modial',
    expense_date: new Date('05/06/2015'),
    expense_amount: 2500520,
    rose_type: 'Mondual',
    supplier: 'Paloquemado',
  },
  {
    id_expense: 4,
    expense_name: 'Venta Modial',
    expense_date: new Date('05/06/2015'),
    expense_amount: 2500520,
    rose_type: 'Mondual',
    supplier: 'Paloquemado',
  },
  {
    id_expense: 3,
    expense_name: 'Venta Modial',
    expense_date: new Date('05/06/2015'),
    expense_amount: 2500520,
    rose_type: 'Mondual',
    supplier: 'Paloquemado',
  },
  {
    id_expense: 2,
    expense_name: 'Venta Modial',
    expense_date: new Date('05/06/2015'),
    expense_amount: 2500520,
    rose_type: 'Mondual',
    supplier: 'Paloquemado',
  },
  {
    id_expense: 5,
    expense_name: 'Venta Modial',
    expense_date: new Date('05/06/2015'),
    expense_amount: 2500520,
    rose_type: 'Mondual',
    supplier: 'Paloquemado',
  },
];

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [MatTableModule, RouterLink, DatePipe],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent {
  displayedColumns: string[] = [
    'id_expense',
    'expense_name',
    'expense_date',
    'expense_amount',
    'rose_type',
    'supplier',
    'expenseActions',
  ];
  dataSource = ELEMENT_DATA;
}
