import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { transactionAdapter } from '../../../../services/transactions.service';
import { getBalanceReport } from '../../../../services/reports.service';


export type TransactionsOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;

};

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
})
export class BalanceComponent implements OnInit {
  public transactionsOptions?: TransactionsOptions;

  constructor(private store: Store) {
    this.store.dispatch(transactionAdapter.getAll());

    this.store.select(getBalanceReport).subscribe(data => {
      // console.log(data)

      this.transactionsOptions = {
        series: [data.incomes, data.expenses],
        chart: {
          type: 'pie',
          height: 420,
        },
        labels: ['Ingresos', 'Egresos'],
        colors: ['#006400', '#8B0000'],
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#fff'],
            fontSize: '16px',
            fontWeight: 'bold',
          },
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 1,
            opacity: 0.5,
          },
        },
        stroke: {
          colors: ['#ffffff'],
          width: 3,
        },
        plotOptions: {
          pie: {
            dataLabels: {
              offset: -25,
            },
            donut: {
              size: '75%',
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: '22px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                },
                value: {
                  show: true,
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                },
              },
            },
          },
        },

        legend: {
          position: 'bottom',
          fontFamily: 'Cormorant',
          fontSize: '25rem',
          fontWeight: 'bold',
        },
      };

    })

  }

  ngOnInit(): void { }
}
