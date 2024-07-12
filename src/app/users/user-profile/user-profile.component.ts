import { Component } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserFormComponent } from '../../share/user-form/user-form.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [UserCardComponent, UserFormComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

}
