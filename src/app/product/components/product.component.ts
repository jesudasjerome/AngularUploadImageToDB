import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../interface/product';
import { FileHandle } from '../interface/file-handle';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../common/category';
import { Brand } from '../common/brand';
import { Subcategory } from '../common/subcategory';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  product: Product = {
    sku: '',
    name: '',
    description: '',
    unitPrice: '',
    active: false,
    unitsInStock: 0,
    subCategory: [],
    brand:[],
    images: [],
    imageData: []
    //  productImages: []

  }

  subCategories: Subcategory[] = [];
  brands: Brand[] = [];
 // file: any;

  constructor(private formBuilder: FormBuilder,
    private productSerive: ProductService,
    private sanitizer: DomSanitizer,
    private activateRoute: ActivatedRoute) { }


    productForm = this.formBuilder.group({
      sku: [''],
      name: [''],
      description: [''],
      unitPrice: [''],
      active: [''],
      unitsInStock: [''],
      subCategory:[''],
      brand:[''],
      images:[''],
      imageData:['']
      // productImage:['']

    });

    // productForm = this.formBuilder.group({
    //   sku: ['phone12093'],
    //   name: ['iPhone 12'],
    //   description: ['iPhone 12 '],
    //   unitPrice: ['599'],
    //   active: ['true'],
    //   unitsInStock: ['1200'],
    //   imageData:['']
    //   // productImage:['']

    // });




  ngOnInit(): void {
    //this.getSubCategories();
    //console.log(this.categories);
    //Populate the Subcategory Dropdown

    this.product = this.activateRoute.snapshot.data['product'];

      // console.log(this.product);
      this.updateProductFrom(this.product);

     this.getSubCategories()

     this.getBrands();




  }




  onSubmit() {

    this.updateProduct();

   // this.product = this.productForm.value;
     //this.product!.productImages = this.file;
    const productFormData = this.prepareFormData(this.product)

    console.log(this.product)
    // console.log(productFormData)

    this.productSerive.addNewProduct(productFormData).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }


    );

    //this.productForm.reset();
    this.product.imageData = []

  }

  //Get all the Subcategory  and populate the dropdown

  getSubCategories(){
    this.productSerive.getAllSubCategories().subscribe(
      data =>{
        console.log(data);
       this.subCategories = data;
        this.productForm.controls.subCategory.setValue("data[0].categoryName");
      }
    );
  }

    //Get all the Brand  and populate the dropdown

    getBrands(){
      this.productSerive.getAllBrands().subscribe(
        data =>{
          console.log(data);
          this.brands = data;
          this.productForm.controls.brand.setValue("data[0].brandName");
        }
      );
    }

  updateProduct(){
    this.product.sku = this.productForm.value.sku!.toString();
    this.product.name = this.productForm.value.name!.toString();
    this.product.description = this.productForm.value.description!.toString();
    this.product.unitPrice = this.productForm.value.unitPrice!.toString();
    this.product.active = true;
    this.product.unitsInStock = Number(this.productForm.value.unitsInStock)  ;
    this.product.subCategory  =  JSON.parse(JSON.stringify(this.productForm.value.subCategory!)) ;
    this.product.brand   =  JSON.parse(JSON.stringify(this.productForm.value.brand!));
  }

  updateProductFrom(product: Product){
    this.productForm.patchValue({

    sku : this.product.sku ,
    name:  this.product.name,
    description : this.product.description,
    unitPrice  :  this.product.unitPrice?.toString() ,
    active : '1',
    unitsInStock  :  this.product.unitsInStock?.toLocaleString(),
    subCategory: this.product.subCategory.toString(),
    brand: this.product.brand.toString()
   })
}

  prepareFormData(product: Product): FormData {
  //  console.log(product);
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(this.product)], { type: 'application/json' })
    );

    for (var i = 0; i < product.imageData.length; i++) {
   //   console.log(product.imageData[i].file)
     // console.log(product.imageData[i].file.name)
      formData.append(
        'imageFile',
         product.imageData[i].file,
         product.imageData[i].file.name
      );
    }



    return formData;

  }


  onFileSelected(event: any) {

    // this.product = this.productForm.value;
  //  console.log(event);
    // console.log(event);

    if (event.target.files) {

      const file = event.target.files[0];
      console.log(file);
      const filehandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustResourceUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.imageData.push(filehandle);
      console.log(this.product.imageData);
    }
    // console.log(this.product);

  }

  fileDropped(fileHandle:FileHandle){
    this.product.imageData.push(fileHandle);
  }

  removeImages(i:number){
    this.product.imageData.splice(i,1);
  }
  getSubCategory(fromControl:string){
  //  this.product.subCategory = fromControl.value['id'];
  // console.log(this.productForm?.controls?.brand.value(0))
   //console.log(fromControl.value['id'])
   }
   getBrand(fromControl:string){
 //  this.product.brand = fromControl.value['id'];
 // console.log(this.productForm?.controls?.brand.value(0))
    //console.log(fromControl.value)
  }

}
