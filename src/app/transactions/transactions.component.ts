import { Component, Input, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  types = [
    'Rosa Roja',
    'Rosa Mundial',
    'Fertilizante',
    'Pesticida',
    'Herbicida',
    'Plagicida',
    'Combustible',
    'Abono',
  ];
}
