import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss'
})
export class QuestionCardComponent {
  svg = input<string>();
  title = input<string>();
  text = input<string>()

}
