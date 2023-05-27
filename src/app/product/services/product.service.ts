import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interface/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'http://localhost:8080/api/products/addNewProduct';

  constructor(private httpClient: HttpClient) { }




  addNewProduct(product:FormData){
    return this.httpClient.post<Product>(this.productUrl, product);
  }
}
