import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

export interface expenseElement {
  expenseID: number;
  expenseName: string;
  expenseDate: Date;
  expenseAmount: number;
  roseType: string;
  roseCategory: boolean;
  supplier: string;
}

const ELEMENT_DATA: expenseElement[] = [
  {
    expenseID: 1,
    expenseName: 'Venta Modial',
    expenseDate: new Date('05/06/2015'),
    expenseAmount: 2500520,
    roseType: 'Mondual',
    roseCategory: true,
    supplier: 'Paloquemado',
  },
  {
    expenseID: 4,
    expenseName: 'Venta Modial',
    expenseDate: new Date('05/06/2015'),
    expenseAmount: 2500520,
    roseType: 'Mondual',
    roseCategory: true,
    supplier: 'Paloquemado',
  },
  {
    expenseID: 3,
    expenseName: 'Venta Modial',
    expenseDate: new Date('05/06/2015'),
    expenseAmount: 2500520,
    roseType: 'Mondual',
    roseCategory: true,
    supplier: 'Paloquemado',
  },
  {
    expenseID: 2,
    expenseName: 'Venta Modial',
    expenseDate: new Date('05/06/2015'),
    expenseAmount: 2500520,
    roseType: 'Mondual',
    roseCategory: true,
    supplier: 'Paloquemado',
  },
  {
    expenseID: 5,
    expenseName: 'Venta Modial',
    expenseDate: new Date('05/06/2015'),
    expenseAmount: 2500520,
    roseType: 'Mondual',
    roseCategory: true,
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
    'expenseID',
    'expenseName',
    'expenseDate',
    'expenseAmount',
    'roseType',
    'roseCategory',
    'supplier',
    'expenseActions'];
  dataSource = ELEMENT_DATA;
}
