import { CommonModule } from '@angular/common';
import { Component, OnInit, viewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

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
import { transactionAdapter } from '../../../../services/transactions.service';

import { getPeriodReportData } from '../../../../services/reports.service';
import { Store } from '@ngrx/store';
import { PortalContentComponent } from '@ea-controls/portal';


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
  imports: [
    CommonModule,
    NgApexchartsModule,
    MatTableModule,
    MatButtonModule,
    PortalContentComponent],
  templateUrl: './net-income.component.html',
  styleUrl: './net-income.component.scss'
})
export class NetIncomeComponent implements OnInit {

  displayedColumns: string[] = ['period', 'incomes', 'expenses', 'netIncome'];
  dataSource: any[] = [];

  public netIncomeOptions?: netIncomeOptions;
  //store: any;

  constructor(private store: Store) {
    this.store.dispatch(transactionAdapter.getAll());

    this.store.select(getPeriodReportData).subscribe(data => {
      this.dataSource = data;
      //console.log('data', data);



      this.netIncomeOptions = {
        series: [
          {
            name: "Utilidad Neta",
            data: data.map(x => x.netIncome)  // Datos de utilidad neta trimestral
          }
        ],
        chart: {
          height: 350,
          type: 'line'
        },
        xaxis: {
          categories: data.map(x => x.period)
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

    })


  }

  ngOnInit(): void {

  }
}
