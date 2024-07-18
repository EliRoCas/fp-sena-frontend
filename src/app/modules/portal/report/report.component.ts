import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BalanceComponent } from './balance/balance.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [BalanceComponent, RouterLink],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit {
  public baseMoney: number;
  public spentMoney: number;
  public lastIncomes: string[];
  public lastExpenses: string[];

  constructor() {

    this.baseMoney = 5000;
    this.spentMoney = 2500;
    this.lastIncomes = ['Ingreso 1', 'Ingreso 2', 'Ingreso 3'];
    this.lastExpenses = ['Gasto 1', 'Gasto 2', 'Gasto 3'];
  }


  ngOnInit(): void {


  }
}