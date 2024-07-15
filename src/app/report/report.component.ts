import { Component } from '@angular/core';
import { BalanceComponent } from './balance/balance.component';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [BalanceComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

}
