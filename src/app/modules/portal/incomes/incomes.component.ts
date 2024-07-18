import { DatePipe } from '@angular/common';
import { Component} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

export interface IncomeElement {
  incomeID: number,
  incomeName: string,
  incomeDate: Date,
  incomeAmount: number,
  roseType: string,
  roseCategory: boolean,
  customer: string,
}

const ELEMENT_DATA: IncomeElement[] = [
  {
    incomeID: 1,
    incomeName: 'Venta Modial',
    incomeDate: new Date ('05/06/2015'),
    incomeAmount: 2500520,
    roseType: 'Mondual',
    roseCategory: true,
    customer: 'Paloquemado'
  },
  {
    incomeID: 7,
    incomeName: 'Venta Modial',
    incomeDate: new Date ('05/06/2015'),
    incomeAmount: 2500520,
    roseType: 'Mondial',
    roseCategory: true,
    customer: 'Paloquemado'
  },
  {
    incomeID: 2,
    incomeName: 'Venta Modial',
    incomeDate: new Date ('05/12/2016'),
    incomeAmount: 2500520,
    roseType: 'Mondual',
    roseCategory: false,
    customer: 'Paloquemado'
  },
  {
    incomeID: 3,
    incomeName: 'Venta Modial',
    incomeDate:new Date ('28/4/2018') ,
    incomeAmount: 2500520,
    roseType: 'Mondual',
    roseCategory: false,
    customer: 'Paloquemado'
  },
  {
    incomeID: 4,
    incomeName: 'Venta Rosa Roja',
    incomeDate: new Date ('05-07-2015'),
    incomeAmount: 5500520,
    roseType: 'Roja',
    roseCategory: true,
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
    'incomeID',
    'incomeName',
    'incomeDate',
    'incomeAmount',
    'roseType',
    'roseCategory',
    'customer',
    'incomeActions'];
  dataSource = ELEMENT_DATA;
}
