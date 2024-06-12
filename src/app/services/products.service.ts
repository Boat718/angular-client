import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Product, Products } from 'src/types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiservice: ApiService) { }

  getProducts = (url: string, params: PaginationParams): Observable<Products> => {
    return this.apiservice.get(url, {
      params,
      responseType:'json',
    }) 
  }

  addProduct = (url:string, body:any): Observable<any> => {
    return this.apiservice.post(url, body, {});
  }


  editProduct = (url:string, body:any): Observable<any> => {
    return this.apiservice.put(url, body, {});
  }

  deleteProduct = (url:string): Observable<any> => {
    return this.apiservice.delete(url, {});
  }
}
