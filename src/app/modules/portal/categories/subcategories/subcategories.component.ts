import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PortalContentComponent } from '@ea-controls/portal';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [CommonModule, PortalContentComponent],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss'
})
export class SubcategoriesComponent {

  parentCategories: string[] = [
    "Ventas", "Gastos", "Agroinsumo", "Servicios", "Salarios"];

  subcategories: any = {
    'Ventas': ['Rosa Mondial', 'Rosa Roja', 'Rosa Nacional'],
    'Gastos': ['Mercado', 'Fertilizante'],
    "Agroinsumo ": ['Pesticida', 'Herbicida', 'Abono'],
    'Servicios': ['Luz', 'Agua', 'Aseo'],
    'Salarios': ['Opeario', 'Ingeniero']
  }

}
