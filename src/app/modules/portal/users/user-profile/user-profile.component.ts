import { Component, OnInit, signal } from '@angular/core';
import { UserFormComponent } from '../../../../share/user-form/user-form.component';
import { AuthService } from '../../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [UserFormComponent, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  email = signal('');

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.email.set(this.authService.email);
  }
}
