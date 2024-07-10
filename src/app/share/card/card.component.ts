import { Component, input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  
  src = input<string>();
  text = input<string>();
  title = input<string>()

  showHover= input<boolean>(false)
}

