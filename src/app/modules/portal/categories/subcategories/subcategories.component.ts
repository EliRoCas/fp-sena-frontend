import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { PortalContentComponent } from '@ea-controls/portal';
import { FilterComponent } from '../../../../share/filter/filter.component';
import { subcatAdapter, subcatByName, SubcategoryModel } from '../../../../services/subcategories.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [
    CommonModule,
    PortalContentComponent,
    MatTableModule,
    RouterLink,
    FilterComponent,
  ],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss'
})
export class SubcategoriesComponent {

  displayedColumns: string[] = ['id_subcategory', 'subcategory_name', 'fo_category', 'subcatActions'];
  dataSource = signal<SubcategoryModel[]>([]);
  selected = signal<SubcategoryModel | undefined>(undefined);


  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(subcatAdapter.getAll());
    this.store.select(subcatAdapter.feature).subscribe(data => this.dataSource.set(data));

    this.store.select(subcatAdapter.selectById("2")).subscribe(data => this.selected.set(data));

    this.store.select(subcatByName('')).subscribe(result => {
      console.log('subcatByName', result)
    })
  };

  delete(subcategory: SubcategoryModel) {
    this.store.dispatch(subcatAdapter.removeOne(subcategory))
  }


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
