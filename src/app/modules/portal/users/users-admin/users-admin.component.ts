import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../../services/users.service';

export interface userList {
  document_type: string;
  document_number: number;
  user_name: string;
  user_lastname: string;
  user_role: string;
  email: string;
}
// Se tenía a modo de prueba para la tabla de Angular Material 
// const ELEMENT_DATA: userList[] = [
//   { document_type: 'Cédula', document_number: 1151320, user_name: 'Dante', user_lastname: 'Arias', user_role: 'Capataz', email: 'dante@gmail.com' },
//   { document_type: 'CC', document_number: 1151320, user_name: 'Dante', user_lastname: 'Arias', user_role: 'Capataz', email: 'dante@gmail.com' },
//   { document_type: 'CC', document_number: 1151320, user_name: 'Dante', user_lastname: 'Arias', user_role: 'Capataz', email: 'dante@gmail.com' },
//   { document_type: 'CC', document_number: 1151320, user_name: 'Dante', user_lastname: 'Arias', user_role: 'Capataz', email: 'dante@gmail.com' },
//   { document_type: 'CC', document_number: 1151320, user_name: 'Dante', user_lastname: 'Arias', user_role: 'Capataz', email: 'dante@gmail.com' },
//   { document_type: 'CC', document_number: 1151320, user_name: 'Dante', user_lastname: 'Arias', user_role: 'Capataz', email: 'dante@gmail.com' },
//   { document_type: 'CC', document_number: 1151320, user_name: 'Dante', user_lastname: 'Arias', user_role: 'Capataz', email: 'dante@gmail.com' },
// ];

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [MatTableModule, MatIcon, RouterLink, FormsModule],
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.scss'
})
export class UsersAdminComponent {
  displayedColumns: string[] = ['document_type', 'document_number', 'user_name', 'user_lastname', 'user_role', 'email', 'actions'];
  // dataSource = ELEMENT_DATA;
  dataSource: userList[] = [];

  constructor(private usersSvc: UsersService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.usersSvc.getAll().subscribe((result: any) => {
      this.dataSource = result;
    }
    )
  }
}
