import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from 'src/types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private productService: ProductsService
  ) {}

  products:Product[] = [];

  totalRecords:number = 0;
  rows:number = 5;

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  onPageChange(event: any) {
    this.fetchProuducts(event.page, event.rows);
  }

  fetchProuducts(page: number, perPage:number) {
    this.productService.getProducts('http://localhost:3000/clothes', {page:page, perPage:perPage})
    .subscribe((products: Products) => {
      this.products = products.items;
      this.totalRecords = products.total;
    })
  }

  editProduct(product:Product, id:number) {
    this.productService.editProduct(`http://localhost:3000/clothes/${id}`, product)
    .subscribe({
      next:(data) => {
        console.log(data);
        this.fetchProuducts(0, this.rows);
      },
      error:(err) => {
        console.log(err)
      }
    })
  }

  deleteProduct(id:number) {
    this.productService.deleteProduct(`http://localhost:3000/clothes/${id}`)
    .subscribe({
      next:(data) => {
        console.log(data);
        this.fetchProuducts(0, this.rows);
      },
      error:(err) => {
        console.log(err)
      }
    })
  }

  addProduct(product:Product, id:number) {
    this.productService.addProduct(`http://localhost:3000/clothes`, product)
    .subscribe({
      next:(data) => {
        console.log(data);
        this.fetchProuducts(0, this.rows);
      },
      error:(err) => {
        console.log(err)
      }
    });
  }

  ngOnInit() {
    this.fetchProuducts(0, this.rows);
  }

}
