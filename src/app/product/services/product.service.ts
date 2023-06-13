import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interface/product';
import { Observable } from 'rxjs';
import { Resproduct } from '../interface/resproduct';
import { Subcategory } from '../common/subcategory';
import { Brand } from '../common/brand';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }




  public addNewProduct(product:FormData){
    return this.httpClient.post<Product>(this.baseUrl+"products/addNewProduct", product);
  }

  public getAllProducts(){
    return this.httpClient.get<Product[]>(this.baseUrl+"products/getAllProducts");
  }

  getProductById(id: string) {
    return this.httpClient.get<Product>(this.baseUrl+"products/"+id);
  }


  public deleteProduct(id:number){
    return this.httpClient.delete(this.baseUrl+"products/"+id);
  }


  public getAllSubCategories(){
    return this.httpClient.get<Subcategory[]>(this.baseUrl+"sub-category/getAllSubCategories");
  }

  public getAllBrands(){
    return this.httpClient.get<Brand[]>(this.baseUrl+"brand/getAllBrands");
  }


}
