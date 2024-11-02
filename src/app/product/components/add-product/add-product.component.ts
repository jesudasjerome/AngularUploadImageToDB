

import { Subcategory } from './../../common/subcategory';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Brand } from '../../common/brand';

import { Product } from '../../common/product';



@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productFromGroup!: FormGroup;

   product: Product[] = []
   subCategories: Subcategory[] = [];
   brands: Brand[] = [];

  //product?: NewProduct


  constructor(private formBuilder: FormBuilder,
    private productSerive: ProductService) { }


  ngOnInit(): void {

    this.productFromGroup = this.formBuilder.group({
      product: this.formBuilder.group({
        name: [''],
        subCategory: [''],
        brand: ['']
      })
      // subCategory: this.formBuilder.group({
      //   subCategory:['']
      // // }),
      // brand: this.formBuilder.group({
      //   brand:['']
      // })
    });

    // productForm = this.formBuilder.group({
    //   sku: [''],
    //   name: [''],
    //   description: [''],
    //   unitPrice: [''],
    //   active: [''],
    //   unitsInStock: [''],
    //   subCategory:[''],
    //   brand:['']
    //   //imageData:['']
    //   // productImage:['']

    // });

    this.productSerive.getAllSubCategories().subscribe(
      data => {
        console.log("Retrieved SubCategories: " + JSON.stringify(data));
        console.log(JSON.stringify(data))
        this.subCategories = data
      }
    );

    this.productSerive.getAllBrands().subscribe(
      data => {
        console.log("Retrieved Brands: " + JSON.stringify(data));
        this.brands = data
      }
    );

  }


  get name() { return this.productFromGroup.get('product.name')?.value };
  get subCategory() { return this.productFromGroup.get('product.subCategory')?.value }
  get brand() { return this.productFromGroup.get('product.brand')?.value }

  onSubmit() {



    // let product = new Product()
    //  product.name = this.name;
    //  product.subCategory = this.subCategory;
    //  product.brand = this.brand;
    // //product: NewProduct;

    //this.productFromGroup;
    // product.subCategory = JSON.stringify(this.subCategory).
    //const addProdut =   JSON.stringify(product)
    //console.log(product)
    // console.log(product);
    // this.productSerive.newProduct(product).subscribe(
    //   (response: Product) => {
    //     console.log(response);
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }

    // );
  }



  // Category dropbox event
  getSubCategory(fromGroupName: string) {

  }
  // Brand dropbox event

  getBrand(fromGroupName: string) {

  }



}
