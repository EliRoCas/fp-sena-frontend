import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

export interface userList {
  idType: string;
  idNumber: number;
  name: string;
  lastname: string;
  rol: string;
  email: string;
  }

const ELEMENT_DATA: userList[] = [
  { idType: 'Cédula', idNumber: 1151320, name: 'Dante', lastname: 'Arias', rol:'Capataz', email:'dante@gmail.com'},
  { idType: 'CC', idNumber: 1151320, name: 'Dante', lastname: 'Arias', rol:'Capataz', email:'dante@gmail.com'},
  { idType: 'CC', idNumber: 1151320, name: 'Dante', lastname: 'Arias', rol:'Capataz', email:'dante@gmail.com'},
  { idType: 'CC', idNumber: 1151320, name: 'Dante', lastname: 'Arias', rol:'Capataz', email:'dante@gmail.com'},
  { idType: 'CC', idNumber: 1151320, name: 'Dante', lastname: 'Arias', rol:'Capataz', email:'dante@gmail.com'},
  { idType: 'CC', idNumber: 1151320, name: 'Dante', lastname: 'Arias', rol:'Capataz', email:'dante@gmail.com'},
  { idType: 'CC', idNumber: 1151320, name: 'Dante', lastname: 'Arias', rol:'Capataz', email:'dante@gmail.com'},
 ];

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [MatTableModule, MatIcon, RouterLink],
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.scss'
})
export class UsersAdminComponent {
  displayedColumns: string[] = ['idType', 'idNumber', 'name', 'lastname', 'rol', 'email', 'actions'];
  dataSource = ELEMENT_DATA;
}
