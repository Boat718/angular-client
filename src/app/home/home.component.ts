import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from 'src/types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, 
    PaginatorModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private productService: ProductsService
  ) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  products:Product[] = [];

  totalRecords:number = 0;
  rows:number = 5;

  displayEditPopup:boolean = false;
  displayAddPopup:boolean = false;

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }

    this.deleteProduct(product.id);
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return;
    }

    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  onPageChange(event: any) {
    this.fetchProuducts(event.page, event.rows);
  }

  resetPaginator() {
    this.paginator?.changePage(0);
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
        this.resetPaginator();
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
        this.resetPaginator();
      },
      error:(err) => {
        console.log(err)
      }
    })
  }

  addProduct(product:Product) {
    this.productService.addProduct(`http://localhost:3000/clothes`, product)
    .subscribe({
      next:(data) => {
        console.log(data);
        this.fetchProuducts(0, this.rows);
        this.resetPaginator();
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
