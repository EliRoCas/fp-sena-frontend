import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UserModel, UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [MatTableModule, MatIcon, RouterLink],
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.scss'
})
export class UsersAdminComponent {
  displayedColumns: string[] = ['document_type', 'document_number', 'user_name', 'user_lastname', 'user_role', 'email', 'actions'];
  dataSource: UserModel[] = [];

  constructor(private usersSvc: UsersService) { }

  ngOnInit(): void {
    this.usersSvc.getAll().subscribe(result => {
      this.dataSource = result;
    });
  }

}