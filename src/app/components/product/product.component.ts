import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/types';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!:Product;
  @Output() productOutput: EventEmitter<Product> = new EventEmitter<Product>();



  ngOnInit() {
    this.productOutput.emit(this.product);
  }
}