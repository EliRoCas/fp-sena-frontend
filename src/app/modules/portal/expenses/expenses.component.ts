import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

export interface expenseElement {
  expenseId: number;
  expenseName: string;
  expenseDate: Date;
  expenseAmount: number;
  roseType: string;
  supplier: string;
}

const ELEMENT_DATA: expenseElement[] = [
  {
    expenseId: 1,
    expenseName: 'Venta Modial',
    expenseDate: new Date('05/06/2015'),
    expenseAmount: 2500520,
    roseType: 'Mondual',
    supplier: 'Paloquemado',
  },
  {
    expenseId: 4,
    expenseName: 'Venta Modial',
    expenseDate: new Date('05/06/2015'),
    expenseAmount: 2500520,
    roseType: 'Mondual',
    supplier: 'Paloquemado',
  },
  {
    expenseId: 3,
    expenseName: 'Venta Modial',
    expenseDate: new Date('05/06/2015'),
    expenseAmount: 2500520,
    roseType: 'Mondual',
    supplier: 'Paloquemado',
  },
  {
    expenseId: 2,
    expenseName: 'Venta Modial',
    expenseDate: new Date('05/06/2015'),
    expenseAmount: 2500520,
    roseType: 'Mondual',
    supplier: 'Paloquemado',
  },
  {
    expenseId: 5,
    expenseName: 'Venta Modial',
    expenseDate: new Date('05/06/2015'),
    expenseAmount: 2500520,
    roseType: 'Mondual',
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
    'expenseId',
    'expenseName',
    'expenseDate',
    'expenseAmount',
    'roseType',
    'supplier',
    'expenseActions',
  ];
  dataSource = ELEMENT_DATA;
}
