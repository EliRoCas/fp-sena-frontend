import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { OurServicesComponent } from "./our-services/our-services.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CarouselComponent, OurServicesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
 

}
