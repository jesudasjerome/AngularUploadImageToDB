import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interface/product';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ListProductImagesComponent } from '../list-product-images/list-product-images.component';
import { ImageProcessingServiceService } from '../services/image-processing-service.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products: Product[] = [];

  displayedColumns: string[] = ['Id', 'Product SKU', 'Product Name',
    'Description', 'Unit Price', 'Units In Stock', 'Active', 'Image', 'Edit', 'Delete'];

  constructor(private productService: ProductService,
    public imagesDialog: MatDialog,
    private imageProssesingService: ImageProcessingServiceService,
    private router: Router) { }


  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts()
      .pipe(
        map((x: Product[], i) => x.map(

          (product: Product) => this.imageProssesingService.createImages(product)

        )
        )
      )
      .subscribe(
        (response: Product[]) => {
          this.products = response;
        }, (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }


  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      (response:any) => {
        this.getAllProducts();
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  editProduct(id:Number){
  //  console.log(id);
    this.router.navigate(['Admin/AddProduct', {productId:id}])
  }

  showImages(product: Product) {
    //console.log(product);
    this.imagesDialog.open(ListProductImagesComponent, {
      data: {
        images: product.imageData
      },
      height: '500px',
      width: '800px'
    });
  }

}
