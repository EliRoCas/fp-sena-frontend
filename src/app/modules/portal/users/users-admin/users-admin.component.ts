import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { provideStore, provideState, Store } from '@ngrx/store';
import { userAdapter, userByName, UserModel } from '../../../../services/users.service';
import { PortalContentComponent } from '@ea-controls/portal';

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule, MatIcon, RouterLink, PortalContentComponent],
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.scss'
})

export class UsersAdminComponent {
  // Se definen las columnas que se mostrarán en la tabla (de Angular Material)
  displayedColumns: string[] = ['document_type', 'document_number', 'user_name', 'user_lastname', 'user_role', 'email', 'actions'];
  // Se crean dos signals para manejar los estados reactivos. 
  // La primera maneja los datos de "UserModel"
  // La segunda maneja el usuario que se filtra, por lo que es 'undefined'.  
  dataSource = signal<UserModel[]>([]);
  selected = signal<UserModel | undefined>(undefined);

  constructor(private store: Store) { }

  ngOnInit(): void {
    // Se realiza el "envío/dispatch" de la acción "userAdapter.getAll()" 
    // para obtener todos los usuarios. 
    this.store.dispatch(userAdapter.getAll());
    // Se realiza la suscripción a los datos enviados y se actualiza el "datasource", 
    // con los datos que se obtienen. 
    this.store.select(userAdapter.feature).subscribe(data => this.dataSource.set(data));
    // Se realiza la suscripción a los cambios en el usuario con ID particular y se actualiza 
    // el selected con los datos obtenidos. 
    this.store.select(userAdapter.selectById("2")).subscribe(data => this.selected.set(data));

    // Se realiza la suscripción al selector "userByName" y se registra el resultado 
    this.store.select(userByName('do')).subscribe(result => {
      console.log('userByName', result)
    })
  };

  delete(user: UserModel) {
    this.store.dispatch(userAdapter.removeOne(user));
  }

 
}