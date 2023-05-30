import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interface/product';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ListProductImagesComponent } from '../list-product-images/list-product-images.component';
import { ImageProcessingServiceService } from '../services/image-processing-service.service';
import { map } from 'rxjs';
import { Resproduct } from '../interface/resproduct';

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
    public imagesDialog: MatDialog, private imageProssesingService: ImageProcessingServiceService) { }


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
          console.log(this.products);
        }, (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }


  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      (response) => {
        this.getAllProducts();
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  showImages(product: Product) {
    console.log(product);
    this.imagesDialog.open(ListProductImagesComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });
  }

}
