import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interface/product';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ListProductImagesComponent } from '../list-product-images/list-product-images.component';
import { ImageProcessingServiceService } from '../services/image-processing-service.service';
import { catchError, map, of, retry } from 'rxjs';
import { Router } from '@angular/router';
import { Resproduct } from '../interface/resproduct';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products: Resproduct[] = [];

  displayedColumns: string[] = ['Id', 'Product SKU', 'Product Name',
    'Description', 'Unit Price', 'Units In Stock', 'Active', 'Image', 'Edit', 'Delete'];

  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingServiceService,
    private router: Router) { }


  ngOnInit(): void {
    this.getAllProducts();
  }

  // public getAllProducts() {
  //   this.productService.getAllProducts()
  //     .pipe(

  //       map((x: Product[], i) => x.map(

  //         (product: Product) => this.imageProssesingService.createImages(product)

  //       )
  //       )
  //     )
  //     .subscribe(
  //       (response: Product[]) => {
  //         this.products = response;
  //       }, (error: HttpErrorResponse) => {
  //         console.log(error);
  //       }
  //     );
  // }

  // public getAllProducts() {
  //   this.productService.getAllProducts()
  //     .pipe(
  //       map((response: any) => {
  //         // Access the 'content' field where the array of products is located
  //         const products = response?.content || [];

  //         // Ensure products is an array before calling map
  //         return products.map((product: Product) =>
  //           this.imageProcessingService.createImages(product)
  //         );
  //       }),
  //       catchError(error => {
  //         console.log('Error fetching products', error);
  //         return of([]); // Return an empty array in case of error
  //       })
  //     )
  //     .subscribe(
  //       (response: Product[]) => {
  //         this.products = response;
  //       },
  //       (error: HttpErrorResponse) => {
  //         console.log(error);
  //       }
  //     );
  // }

  public getAllProducts() {
    this.productService.getAllProducts().subscribe(
        (response: Resproduct[] ) => {
          console.log(response)
          this.products = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }



  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      (response: any) => {
        this.getAllProducts();
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  editProduct(id: Number) {
    //  console.log(id);
    this.router.navigate(['Admin/AddProduct', { productId: id }])
  }

  showImages(product: Product) {
    console.log(product);
    this.imagesDialog.open(ListProductImagesComponent, {
      data: {
        image: product.images
      },
      height: '500px',
      width: '800px'
    });
  }

}
