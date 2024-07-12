import { Component } from '@angular/core';
import { UserFormComponent } from '../../share/user-form/user-form.component';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {

}
