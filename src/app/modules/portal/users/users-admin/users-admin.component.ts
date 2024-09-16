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

  displayedColumns: string[] = [
    'document_type',
    'document_number',
    'user_name',
    'user_lastname',
    'user_role',
    'email',
    'actions',
  ];
  dataSource = new MatTableDataSource<UserDocType>();
  selected = signal<UserModel | undefined>(undefined);
  selectedRole = signal<UserDocType | undefined>(undefined);
  selectedDocTypes = signal<DocTypeModel | undefined>(undefined);

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.store.dispatch(userAdapter.getAll());
    this.store.dispatch(roleAdapter.getAll());
    this.store.dispatch(roleAssignAdapter.getAll());
    this.store.dispatch(docTypeAdapter.getAll());

    this.store
      .select(userAdapter.selectById('2'))
      .subscribe((data) => this.selected.set(data));

    this.store.select(userRoleAssign).subscribe((data) => {
      // console.log(data);
      this.dataSource.data = data;
    });

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
    this.store.dispatch(
      roleAssignAdapter.removeOne({
        fo_user: userModel.id_user,
      } as RoleAssignModel)
    );
  }

  deleteUserAndRol(user: UserModel) {
    this.delete(user);
    this.deleteRol(user);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  printTable() {
    window.print();
  }
}
