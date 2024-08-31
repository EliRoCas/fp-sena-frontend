import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { provideStore, provideState, Store } from '@ngrx/store';
import {
  docTypeAdapter,
  DocTypeModel,
  roleAdapter,
  roleAssignAdapter,
  RoleAssignModel,
  RoleModel,
  userAdapter,
  userByName,
  UserDocType,

  UserModel,
  userRoleAssign,
} from '../../../../services/users.service';
import { PortalContentComponent } from '@ea-controls/portal';
import {
  BreakpointObserver,
  Breakpoints,
  LayoutModule,
} from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIcon,
    RouterLink,
    PortalContentComponent,
    MatExpansionModule,
    CommonModule,
    LayoutModule,
  ],
  templateUrl: './users-admin.component.html',
  styleUrl: './users-admin.component.scss',
})
export class UsersAdminComponent {
  readonly panelOpenState = signal(false);
  isSmallScreen = false;

  // Se definen las columnas que se mostrarán en la tabla (de Angular Material)
  displayedColumns: string[] = [
    'document_type',
    'document_number',
    'user_name',
    'user_lastname',
    'user_role',
    'email',
    'actions',
  ];
  // Se crean dos signals para manejar los estados reactivos.
  // La primera maneja los datos de "UserModel"
  // La segunda maneja el usuario que se filtra, por lo que es 'undefined'.
  dataSource = new MatTableDataSource<UserDocType>();
  selected = signal<UserModel | undefined>(undefined);
  selectedRole = signal<RoleAssignModel | undefined>(undefined);
  selectedDocTypes = signal<DocTypeModel | undefined>(undefined);

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    // Se realiza el "envío/dispatch" de la acción "userAdapter.getAll()"
    // para obtener todos los usuarios.
    this.store.dispatch(userAdapter.getAll());
    this.store.dispatch(roleAdapter.getAll());
    this.store.dispatch(roleAssignAdapter.getAll());
    this.store.dispatch(docTypeAdapter.getAll());

    // Se realiza la suscripción a los datos enviados y se actualiza el "datasource",
    // con los datos que se obtienen.
    //this.store.select(userAdapter.feature).subscribe(data => this.dataSource.set(data));

    // Se realiza la suscripción a los cambios en el usuario con ID particular y se actualiza
    // el selected con los datos obtenidos.
    this.store
      .select(userAdapter.selectById('2'))
      .subscribe((data) => this.selected.set(data));

    this.store.select(userRoleAssign).subscribe((data) => {
      console.log(data)
      this.dataSource.data = data;
    });

    // this.store.select(userDocuments).subscribe(data => this.dataSource.data = data)

    const customBreakpoint = '(max-width: 800px)';
    this.breakpointObserver
      .observe([customBreakpoint])
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  delete(user: UserModel) {
    this.store.dispatch(userAdapter.removeOne(user));
  }

  deleteRol(userModel: UserModel) {
    //userModel.roleIds.forEach(role => {

    this.store.dispatch(
      roleAssignAdapter.removeOne({
        fo_user: userModel.id_user,
      } as RoleAssignModel)
    );
    //})
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  printTable() {
    window.print();
  }
}
