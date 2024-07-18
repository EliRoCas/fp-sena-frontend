import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(private route: ActivatedRoute) {}

  id?: string;
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
