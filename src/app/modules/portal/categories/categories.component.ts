import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PortalContentComponent } from '@ea-controls/portal';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, PortalContentComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {



}
