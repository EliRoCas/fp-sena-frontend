import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexStroke,
  ApexFill,
  ApexLegend,
  NgApexchartsModule,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  fill: ApexFill;
};

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
})
export class BalanceComponent implements OnInit {
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [60, 40], // Ejemplo de datos de ingresos y egresos
      chart: {
        type: 'pie',
        height: 420,
      },
      labels: ['Ingresos', 'Egresos'],
      colors: ['#4CAF50', '#F44336'],
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
                color: '#4CAF50',
              },
              value: {
                show: true,
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#F44336',
              },
            },
          },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'vertical',
          shadeIntensity: 0.5,
          gradientToColors: ['#66BB6A', '#EF5350'], // Añadir los colores de gradiente
          inverseColors: false,
          opacityFrom: 0.85,
          opacityTo: 0.85,
          stops: [0, 90, 100],
        },
      },
      legend: {
        position: 'bottom',
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px',
        fontWeight: 'bold',
      },
    };
  }

  ngOnInit(): void {}
}
