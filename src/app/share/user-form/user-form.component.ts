import { Component, effect, input, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  docTypeAdapter,
  DocTypeModel,
  roleAdapter,
  roleAssignAdapter,
  RoleAssignModel,
  RoleModel,
  userAdapter,
  userByEmail,
  userById,
  UserModel,
  userRoleAssign,
} from '../../services/users.service';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  title = input('Registrar Usuario');
  id = input<number | undefined>();
  email = input<string | undefined>();
  docTypes = signal<DocTypeModel[]>([]);
  selectedDoc = signal<DocTypeModel | undefined>(undefined);
  roles = signal<RoleModel[]>([]);

  userForm: FormGroup;

  constructor(
    private store: Store,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.userForm = this.fb.group(
      {
        id_user: [Guid.create().toString()],
        user_name: ['', [Validators.required, Validators.minLength(3)]],
        user_lastname: ['', [Validators.required, Validators.minLength(3)]],
        fo_document_type: [null, [Validators.required]],
        document_number: ['', [Validators.required]],
        roles: null,
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$'
            ),
          ],
        ],
        confirm_password: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );

    effect(() => {
      if (this.id()) {
        this.store
          .select(userById(this.id()!))
          .pipe(filter((userData) => !!userData))
          .subscribe((userData) => {
            this.userForm.patchValue(userData as any);
          });
      } else if (this.email()) {
        this.store
          .select(userByEmail(this.authService.email))
          .subscribe((data) => {
            this.userForm.patchValue(data as any);
          });
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(docTypeAdapter.getAll());
    this.store.dispatch(userAdapter.getAll());
    this.store.dispatch(roleAdapter.getAll());

    this.store
      .select(docTypeAdapter.feature)
      .subscribe((data) => this.docTypes.set(data));

    this.store
      .select(roleAdapter.feature)
      .subscribe((data) => this.roles.set(data));
  }

  add() {
    if (this.id()) {
      this.store.dispatch(
        userAdapter.patchOne(
          this.userForm.value as unknown as UserModel,
          (data) => {
            this._snackBar.open('Datos guardados con éxito', '', {
              duration: 5000,
            });

            this.store.dispatch(
              roleAssignAdapter.removeOne(
                {
                  fo_user: this.userForm.value.id_user,
                } as RoleAssignModel,
                (data) => {
                  this.store.dispatch(
                    roleAssignAdapter.addOne({
                      fo_user: this.userForm.value.id_user,
                      fo_user_role: this.userForm.value.roles,
                    } as RoleAssignModel)
                  );
                  this.router.navigate(['/portal/user-admin']);
                }
              )
            );
          },
          (error) => {
            this._snackBar.open('ERROR', '', { duration: 5000 });
          }
        )
      );
    } else {
      this.store.dispatch(
        userAdapter.addOne(
          this.userForm.value as unknown as UserModel,
          (data) => {
            this._snackBar.open('Datos guardados con éxito', '', {
              duration: 5000,
            });

            this.store.dispatch(
              roleAssignAdapter.addOne({
                fo_user: this.userForm.value.id_user,
                fo_user_role: this.userForm.value.roles,
              } as RoleAssignModel)
            );

            this.userForm.reset();
          },
          (error) => {
            this._snackBar.open('ERROR', '', { duration: 5000 });
          }
        )
      );
    }
  }

  passwordsMatchValidator(
    form: FormGroup
  ): null | { passwordsMismatch: boolean } {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirm_password')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
}
