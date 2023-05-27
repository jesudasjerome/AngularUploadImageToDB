import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../interface/product';
import { FileHandle } from '../interface/file-handle';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  product: Product = {
    sku : '',
    name: '',
    description: '',
    unitPrice: '',
    active: false,
    unitsInStock: 0,
    productImages: []
  }

 // file: any;

  constructor(private formBuilder: FormBuilder,
    private productSerive: ProductService,
    private sanitizer: DomSanitizer) { }


    productForm = this.formBuilder.group({
      sku: ['phone12093'],
      name: ['iPhone 12'],
      description: ['iPhone 12 '],
      unitPrice: ['599'],
      active: ['true'],
      unitsInStock: ['1200'],
      productImage:['']

    });

    updateProduct(){
      this.product.sku = this.productForm.value.sku!.toString();
      this.product.name = this.productForm.value.name!.toString();
      this.product.description = this.productForm.value.description!.toString();
      this.product.unitPrice = this.productForm.value.unitPrice!.toString();
      this.product.active = true;
      this.product.unitsInStock = Number (this.productForm.value.unitsInStock!.toString()) ;


    }

  ngOnInit(): void {
  }




  onSubmit() {

    this.updateProduct();

   // this.product = this.productForm.value;
    //this.product!.productImages = this.file;
    const productFormData = this.prepareFormData(this.product)

    console.log(productFormData)



    this.productSerive.addNewProduct(productFormData).subscribe(
      (response: Product) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );



  }

  prepareFormData(product: Product): FormData {
    console.log(product);
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(this.product)], { type: 'application/json' })
    );

    for (var i = 0; i < product.productImages.length; i++) {
      console.log(product.productImages[i].file)
      console.log(product.productImages[i].file.name)
      formData.append(
        'imageFile',
         product.productImages[i].file,
         product.productImages[i].file.name
      );
    }

    return formData;

  }


  onFileSelected(event: any) {

    // this.product = this.productForm.value;
    console.log(event);
    // console.log(event);

    if (event.target.files) {

      const file = event.target.files[0];
     // console.log(this.file);
      const filehandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustResourceUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.productImages.push(filehandle);
      console.log(this.product.productImages);
    }
    // console.log(this.product);

  }

}
