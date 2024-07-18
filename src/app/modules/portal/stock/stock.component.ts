import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

export interface Products {
  id_product: number;
  product_name: string;
  quantity: string;
  category: string;
}

const ELEMENT_DATA: Products[] = [
  { id_product: 1, product_name: 'Mallas xl', quantity: '2000', category: "Cultivo" },
  { id_product: 1, product_name: 'Mallas xl', quantity: '2000', category: "Cultivo" },
  { id_product: 1, product_name: 'Mallas xl', quantity: '2000', category: "Cultivo" },
  { id_product: 1, product_name: 'Mallas xl', quantity: '2000', category: "Cultivo" },
  { id_product: 1, product_name: 'Mallas xl', quantity: '2000', category: "Cultivo" },
  { id_product: 1, product_name: 'Mallas xl', quantity: '2000', category: "Cultivo" },
  { id_product: 1, product_name: 'Mallas xl', quantity: '2000', category: "Cultivo" },
  { id_product: 1, product_name: 'Mallas xl', quantity: '2000', category: "Cultivo" },
  { id_product: 1, product_name: 'Mallas xl', quantity: '2000', category: "Cultivo" },
  { id_product: 1, product_name: 'Mallas xl', quantity: '2000', category: "Cultivo" }
]

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [MatTableModule, RouterLink],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent {
  displayedColumns: string[] = ['id_product', 'productt_name', 'category', 'quantity', 'productActions'];
  dataSource = ELEMENT_DATA;
}

