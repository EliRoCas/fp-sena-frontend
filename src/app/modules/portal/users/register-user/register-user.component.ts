import { Component, input, model, signal } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { UserFormComponent } from '../../../../share/user-form/user-form.component';
import { roleAdapter, roleAssignAdapter, userAdapter, userRoleAssign } from '../../../../services/users.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {

  id?: number;
  private sub: any;

  constructor(private route: ActivatedRoute,
    private store: Store,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id) {
        this.title.set('Editar usuario');

      }

      this.store.select(userRoleAssign).subscribe(data => {
        console.log(data)
      })
      //console.log(this.id)
    });

    this.store.dispatch(userAdapter.getAll());
    this.store.dispatch(roleAdapter.getAll());
    this.store.dispatch(roleAssignAdapter.getAll());
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  title = signal<string>('Registrar Usuario')
}
