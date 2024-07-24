import { Component, effect, input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { userAdapter, userById, UserModel } from '../../services/users.service';
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
  id = input<number | undefined>()

  userForm = new FormGroup({
    id_user: new FormControl(''),
    user_name: new FormControl(''),
    user_lastname: new FormControl(''),
    fo_document_type: new FormControl(0),
    document_number: new FormControl(''),
    roles: new FormControl(0),
    email: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
  })

  add() {
    if (this.id()) {

      this.store.dispatch(userAdapter.patchOne(this.userForm.value as unknown as UserModel,
        (data) => {
          this._snackBar.open("Datos guardados con éxito", "", { duration: 5000 })
          this.userForm.reset();
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

  constructor(private store: Store, private _snackBar: MatSnackBar) {

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

  }





}
