import { Component, effect, input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { docTypeAdapter, DocTypeModel, roleAdapter, RoleModel, userAdapter, userById, UserModel } from '../../services/users.service';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter } from 'rxjs';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  title = input('Registrar Usuario');
  id = input<number | undefined>();
  docTypes = signal<DocTypeModel[]>([]);
  selectedDoc = signal<DocTypeModel | undefined>(undefined);
  roles = signal<RoleModel[]>([]);
  selectedRol = signal<RoleModel | undefined>(undefined);

  userForm: FormGroup;

  add() {
    if (this.id()) {

      this.store.dispatch(userAdapter.patchOne(this.userForm.value as unknown as UserModel,
        (data) => {
          this._snackBar.open("Datos guardados con éxito", "", { duration: 5000 })
        },
        (error) => {
          this._snackBar.open("ERROR", "", { duration: 5000 })
        }
      ));

    } else {

      this.store.dispatch(userAdapter.addOne(this.userForm.value as unknown as UserModel,
        (data) => {
          this._snackBar.open("Datos guardados con éxito", "", { duration: 5000 })
          this.userForm.reset();
        },
        (error) => {
          this._snackBar.open("ERROR", "", { duration: 5000 })
        }
      ));
    }
  }

  constructor(private store: Store, private _snackBar: MatSnackBar, private fb: FormBuilder) {

    this.userForm = this.fb.group({
      id_user: ['', [Validators.required]],
      user_name: ['', [Validators.required, Validators.minLength(3)]],
      user_lastname: ['', [Validators.required, Validators.minLength(3)]],
      fo_document_type: [0, [Validators.required]],
      document_number: ['', [Validators.required]],
      roles: (0),
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$')
      ]],
      confirm_password: ['', [Validators.required]],
    }, { validators: this.passwordsMatchValidator }
    );

    effect(() => {

      if (this.id()) {
        this.store.select(userById(this.id()!))
          .pipe(
            filter(userData => !!userData)
          )
          .subscribe(userData => {

            this.userForm.patchValue(userData as any);

          })
      }
    });

  }

  ngOnInit(): void {
    this.store.select(docTypeAdapter.feature).subscribe(data => this.docTypes.set(data));

    this.store.dispatch(roleAdapter.getAll());
    this.store.select(roleAdapter.feature).subscribe(data => this.roles.set(data));

    this.store.dispatch(docTypeAdapter.getAll());
  }

  passwordsMatchValidator(form: FormGroup): null | { passwordsMismatch: boolean } {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  };


}
