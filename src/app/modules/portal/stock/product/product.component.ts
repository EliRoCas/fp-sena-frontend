import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PortalContentComponent } from '@ea-controls/portal';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PortalContentComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {

  productForm: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      id_product: [''],
      product_name: ['', [Validators.required, Validators.minLength(3)]],
      product_type: ['', [Validators.required]],
      product_img: [''],
      product_description: [''],
      quantity: [0, [Validators.required]],
      fo_category: [0, [Validators.required]],
    })
  }

  id?: number;
  private sub: any;

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];

      if (this.id) {
        this.title.set('Editar Producto');
      }

      //console.log(this.id)
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  title = signal<string>('Registrar Producto');
}
