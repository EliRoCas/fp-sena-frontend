import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { OurServicesComponent } from "./our-services/our-services.component";
import { SlidderComponent, SlidderItemDirective } from "@ea-controls/slidder";



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, OurServicesComponent, SlidderComponent, SlidderItemDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
 

}
