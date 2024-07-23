import { supportsPassiveEventListeners } from '@angular/cdk/platform';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserModel, UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  title = input('Registrar Usuario')
  user: UserModel = {
    user_name: "",
    user_lastname: "",
    fo_document_type: 0,
    document_type_name: "",
    document_number: 0,
    roles: "",
    email: "",
    password: ""
  }

  constructor(private userSvc: UsersService) { }

  submit() {
    console.log(this.user)
  }

}
