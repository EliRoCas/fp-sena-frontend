import { Component, OnInit, signal } from '@angular/core';
import { UserFormComponent } from '../../../../share/user-form/user-form.component';
import { AuthService } from '../../../../services/auth.service';
import { userAdapter, userByEmail, UserModel } from '../../../../services/users.service';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, first } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [UserFormComponent, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  //user = signal<UserModel | undefined>(undefined);
  email = signal("");

  constructor(
    private store: Store,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.email.set(this.authService.email);
    //this.store.dispatch(userAdapter.getAll());
    //this.store.select(userByEmail(this.authService.email)).subscribe(data => {
    //   this.user.set(data)
    // });
  }
}
