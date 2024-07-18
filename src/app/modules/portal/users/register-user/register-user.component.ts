import { Component, input, model, signal } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { UserFormComponent } from '../../../../share/user-form/user-form.component';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {

  id?: string;
  private sub: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];

      if (this.id) {
        this.title.set('Editar usuario');

      }

      //console.log(this.id)
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  title = signal<string>('Registrar Usuario')
}
