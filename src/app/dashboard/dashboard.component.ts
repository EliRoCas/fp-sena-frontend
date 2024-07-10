import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
 

}
