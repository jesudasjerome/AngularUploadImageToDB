import { Subcategory } from './../../common/subcategory';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup } from '@angular/forms';
import { Brand } from '../../common/brand';
import { ProductService } from '../../services/product.service';
import { FileHandle } from '../../interface/file-handle';
import { DomSanitizer } from '@angular/platform-browser';
import { Product } from '../../interface/product';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../common/category';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  //
  productForm!: FormGroup;

  product:Product = {
    sku: '',
    name: '',
    description: '',
    unitPrice: '',
    active: false,
    unitsInStock: 0,
    subCategory: [],
    brand: [],
    imageData: []
  };

  subCategories: Subcategory[] = [];
  brands: Brand[] = [];

  constructor(private fb: FormBuilder,
    private productSerive: ProductService,
    private sanitizer: DomSanitizer,
    private activateRoute: ActivatedRoute) { }



  ngOnInit(): void {

    this.productForm = this.fb.group({
      sku: [''],
      name: [''],
      description: [''],
      unitPrice: [''],
      active: [''],
      unitsInStock: [''],
      subCategory:[''],
      brand:[''],
      imageData:['']
    });






    this.product = this.activateRoute.snapshot.data['product'];
    console.log( !!this.product.sku);

      if(!!this.product.sku){
        this.updateProductFrom(this.product);
        const subCategory =  JSON.parse(JSON.stringify(this.product.subCategory))
        this.subCategories =  subCategory
        const brand =  JSON.parse(JSON.stringify(this.product.brand))
        this.brands = brand
        console.log( brand);
        this.productForm.get('subCategory')?.patchValue(subCategory);
        this.productForm.get('brand')?.setValue(brand);
      }else{
        this.getSubcategories();

        this.getProductBrands();
      }


  }

  //*********** From data  Start************* */

  get sku() { return this.productForm.get('sku') }
  get name() { return this.productForm.get('name') }
  get description() { return this.productForm.get('description') }
  get unitPrice() { return this.productForm.get('unitPrice') }
  get unitsInStock() { return this.productForm.get('unitsInStock') }
  get brand() { return this.productForm.get('brand') }
  get subCategory() { return this.productForm.get('subCategory') }

  updateProduct(){
    this.product.sku = this.sku?.value;
    this.product.name = this.name?.value;
    this.product.description = this.description?.value;
    this.product.unitPrice = this.unitPrice?.value;
    this.product.active = true;
    this.product.unitsInStock = Number(this.unitsInStock?.value)  ;

    this.product.subCategory  =  JSON.parse(JSON.stringify(this.subCategory?.value));
    this.product.brand   =  JSON.parse(JSON.stringify(this.brand?.value));
  }

 private updateProductFrom(product: Product){
    const subCategory =   JSON.parse(JSON.stringify(this.product.subCategory));
    const brand =   JSON.parse(JSON.stringify(this.product.brand));
    this.productForm.patchValue({

    sku : this.product.sku ,
    name:  this.product.name,
    description : this.product.description,
    unitPrice  :  this.product.unitPrice?.toString() ,
    active : '1',
    unitsInStock  :  this.product.unitsInStock?.toLocaleString(),
    subCategory: subCategory ,
    brand: brand['brand']

   })
   //const subCategory =  JSON.parse(JSON.stringify(this.product.subCategory));
   //this.productForm.get('subCategory')?.setValue(subCategory);
  //  const key = Object.keys( this.product.subCategory[0]);

   console.log("Subcategory:" +   JSON.stringify(this.product.subCategory));
  // console.log("Subcategory:" +    this.product.subCategory );
 // console.log(subCategory['categoryName'])
   //this.productForm.get('brand')?.setValue(this.product.brand);
  }

  private prepareFormData(product: Product): FormData {

    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(this.product)], { type: 'application/json' })
    );

    for (var i = 0; i < product.imageData.length; i++) {
      formData.append(
        'imageFile',
         product.imageData[i].file,
         product.imageData[i].file.name
      );
    }

    return formData;

  }


  //*********** From data  End************* */




  //Populate Subcategories

  private getSubcategories() {
    this.productSerive.getAllSubCategories().subscribe(
      data => {
        this.subCategories = data;
        console.log(data[0])
        this.productForm.get('subCategory')?.setValue(data[0]);

      }
    );
  }


  //Populate Product Brands

  private getProductBrands() {
    this.productSerive.getAllBrands().subscribe(
      data => {
        this.brands = data;
        this.productForm.get('brand')?.setValue(data[0]);

      }
    );
  }

//********** File Handle Start ****** */

  public fileDropped(fileHandle:FileHandle){

    this.product.imageData.push(fileHandle);

  }

  public onFileSelected(event:any){

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

  }

  public removeImages(i:number){
    this.product.imageData.splice(i,1);
  }

  //********** File Handle End ****** */






  public onSubmit() {

    //Assigning the data to the poduct
    this.updateProduct();
    // console.log(this.productForm.value);
   // this.product = this.productForm.value;
    console.log(this.product);

    const productFormData = this.prepareFormData(this.product)

    //console.log(this.product)
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


}
