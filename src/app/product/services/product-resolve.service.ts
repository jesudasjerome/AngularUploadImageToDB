import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Product } from '../interface/product';
import { Observable, map, of } from 'rxjs';
import { ProductService } from './product.service';
import { ImageProcessingServiceService } from './image-processing-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product>   {



  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingServiceService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = route.paramMap.get("productId");
    //console.log(id);
    if (id){
    return this.productService.getProductById(id)
      .pipe(
        map(p=> this.imageProcessingService.createImages(p)
         )
      );

    }
    else{
      return of(this.getProductDetails());
    }
  }

  getProductDetails(){
    return{
      sku : '',
      name: '',
      description: '',
      unitPrice: '',
      active: false,
      unitsInStock: 0,
      subCategories: [],
      brand: [],
      imageData:[],
    }
  }
}
