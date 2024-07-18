import { DatePipe } from '@angular/common';
import { Component} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

export interface IncomeElement {
  id_income: number,
  income_name: string,
  income_date: Date,
  income_amount: number,
  rose_type: string,
  rose_category: boolean,
  customer: string,
}

const ELEMENT_DATA: IncomeElement[] = [
  {
    id_income: 1,
    income_name: 'Venta Modial',
    income_date: new Date ('05/06/2015'),
    income_amount: 2500520,
    rose_type: 'Mondual',
    rose_category: true,
    customer: 'Paloquemado'
  },
  {
    id_income: 7,
    income_name: 'Venta Modial',
    income_date: new Date ('05/06/2015'),
    income_amount: 2500520,
    rose_type: 'Mondial',
    rose_category: true,
    customer: 'Paloquemado'
  },
  {
    id_income: 2,
    income_name: 'Venta Modial',
    income_date: new Date ('05/12/2016'),
    income_amount: 2500520,
    rose_type: 'Mondual',
    rose_category: false,
    customer: 'Paloquemado'
  },
  {
    id_income: 3,
    income_name: 'Venta Modial',
    income_date:new Date ('28/4/2018') ,
    income_amount: 2500520,
    rose_type: 'Mondual',
    rose_category: false,
    customer: 'Paloquemado'
  },
  {
    id_income: 4,
    income_name: 'Venta Rosa Roja',
    income_date: new Date ('05-07-2015'),
    income_amount: 5500520,
    rose_type: 'Roja',
    rose_category: true,
    customer: 'Infinity'
  },
]

@Component({
  selector: 'app-incomes',
  standalone: true,
  imports: [MatTableModule, RouterLink, DatePipe],
  templateUrl: './incomes.component.html',
  styleUrl: './incomes.component.scss'
})
export class IncomesComponent {
  displayedColumns: string[] = [
    'id_income',
    'income_name',
    'income_date',
    'income_amount',
    'rose_type',
    'rose_category',
    'customer',
    'incomeActions'];
  dataSource = ELEMENT_DATA;
}
