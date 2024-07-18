import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

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
