import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { RouterLink } from '@angular/router';

export interface Products {
  productID: number;
  productName: string; 
  quantity: string;
  category: string;
}

const ELEMENT_DATA: Products[] = [
  {productID: 1, productName: 'Mallas xl', quantity: '2000', category: "Cultivo"},
  {productID: 1, productName: 'Mallas xl', quantity: '2000', category: "Cultivo"},
  {productID: 1, productName: 'Mallas xl', quantity: '2000', category: "Cultivo"},
  {productID: 1, productName: 'Mallas xl', quantity: '2000', category: "Cultivo"},
  {productID: 1, productName: 'Mallas xl', quantity: '2000', category: "Cultivo"},
  {productID: 1, productName: 'Mallas xl', quantity: '2000', category: "Cultivo"},
  {productID: 1, productName: 'Mallas xl', quantity: '2000', category: "Cultivo"},
  {productID: 1, productName: 'Mallas xl', quantity: '2000', category: "Cultivo"},
  {productID: 1, productName: 'Mallas xl', quantity: '2000', category: "Cultivo"},
  {productID: 1, productName: 'Mallas xl', quantity: '2000', category: "Cultivo"}
]

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [MatTableModule, RouterLink],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent {
  displayedColumns: string[] = ['productID', 'productName', 'category', 'quantity', 'productActions'];
  dataSource = ELEMENT_DATA;
}

