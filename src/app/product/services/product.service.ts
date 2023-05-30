import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interface/product';
import { Observable } from 'rxjs';
import { Resproduct } from '../interface/resproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'http://localhost:8080/api/products/';

  constructor(private httpClient: HttpClient) { }




  public addNewProduct(product:FormData){
    return this.httpClient.post<Product>(this.productUrl+"addNewProduct", product);
  }

  public getAllProducts(){
    return this.httpClient.get<Product[]>(this.productUrl+"getAllProducts");
  }

  public deleteProduct(id:number){
    return this.httpClient.delete(this.productUrl+id);
  }
}
