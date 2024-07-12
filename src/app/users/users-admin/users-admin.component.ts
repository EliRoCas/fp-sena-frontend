import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  like: string;
  description?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', like: 'si' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' , like: 'si'},
  { description: 'asldjflajdslfaj', position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' , like: 'si'},
  { description: '', position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', like: 'si' },
  { description: 'adsfadfasf ', position: 5, name: 'Boron', weight: 10.811, symbol: 'B', like: 'si'},
  { description: '', position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' , like: 'si'},
  { description: 'asdfadfafd', position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', like: 'si' },
  { description: '', position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' , like: 'si'},
  { description: 'adsfadfa', position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', like: 'si' },
  { description: '', position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' , like: 'si'},
 ];

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [MatTableModule, MatIcon],
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.scss'
})
export class UsersAdminComponent {
  displayedColumns: string[] = ['actions', 'position', 'description','name', 'weight', 'symbol', 'like', 'star'];
  dataSource = ELEMENT_DATA;
}
