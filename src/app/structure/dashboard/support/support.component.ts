import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss',
})
export class SupportComponent {
  supportForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.supportForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  // Se guardan el "mensaje" en un archivo de texto de forma local. 
  onSubmit() {
    if (this.supportForm.valid) {
      const file = new Blob([JSON.stringify(this.supportForm.value)], {
        type: 'text/plain',
      });
      const anchor = document.createElement('a');
      anchor.href = URL.createObjectURL(file);
      anchor.download = 'supportFormData.txt';
      anchor.click();
      URL.revokeObjectURL(anchor.href);
    }
  }
}
