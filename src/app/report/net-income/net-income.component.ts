import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexFill,
  ApexTitleSubtitle,
  NgApexchartsModule
} from 'ng-apexcharts';

export interface NetIncomeData {
  period: string;
  incomes: number;
  expenses: number;
  netIncome: number;
}

const Element_Data: NetIncomeData[] = [
  { period: 'Q1 2024', incomes: 50000000, expenses: 25000000, netIncome: 25000000 },
  { period: 'Q2 2024', incomes: 50000000, expenses: 25000000, netIncome: 25000000 },
  { period: 'Q3 2024', incomes: 50000000, expenses: 25000000, netIncome: 25000000 },
  { period: 'Q4 2024', incomes: 50000000, expenses: 25000000, netIncome: 25000000 },
]

export type netIncomeOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-net-income',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, MatTableModule],
  templateUrl: './net-income.component.html',
  styleUrl: './net-income.component.scss'
})
export class NetIncomeComponent implements OnInit {

  displayedColumns: string[] = ['period', 'incomes', 'expenses', 'netIncome'];
  dataSource = Element_Data;

  public netIncomeOptions: netIncomeOptions;

  constructor() {
    this.netIncomeOptions = {
      series: [
        {
          name: "Utilidad Neta",
          data: [10, 41, 35, 51] // Datos de utilidad neta trimestral
        }
      ],
      chart: {
        height: 350,
        type: 'line'
      },
      xaxis: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4']
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 0.75,
          opacityTo: 0.75,
          stops: [0, 90, 100]
        }
      },
      title: {
        text: 'Utilidad Neta Trimestral',
        align: 'left'
      }
    };
  }

  ngOnInit(): void { }
}
