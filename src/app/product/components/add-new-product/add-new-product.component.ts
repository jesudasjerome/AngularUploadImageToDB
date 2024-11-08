import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../../interface/product';
import { Subcategory } from '../../common/subcategory';
import { Brand } from '../../common/brand';
import { ProductService } from '../../services/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileHandle } from '../../interface/file-handle';
import { ImageUrlService } from '../../services/image-url.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit  {

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
    images:[],
    imageData: []
  };

  subCategories: Subcategory[] = [];
  brands: Brand[] = [];

  selectedFiles: File[] = [];
  imageFiles: File[]= [];
  imagePreviews: string [] = []; // Property to store the image preview
  // imagePreview: string | ArrayBuffer | null = null; // Property to store the image preview

  constructor(private fb: FormBuilder,
    private productSerive: ProductService,
    private sanitizer: DomSanitizer,
    private activateRoute: ActivatedRoute,
    private imageUrlService: ImageUrlService
  ){}




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
      images:[],
      imageData:['']
     });



     this.product = this.activateRoute.snapshot.data['product'];
     console.log( !!this.product.sku);

       if(!!this.product.sku){

         this.updateProductFrom(this.product);
        const subCategory: Subcategory []  =[];
        subCategory.push(  JSON.parse(JSON.stringify(this.product.subCategory)));
        console.log(subCategory)
         this.subCategories =  subCategory
         const brand:Brand[] = [];
         brand.push(JSON.parse(JSON.stringify(this.product.brand)));
         this.brands =  brand
          console.log( this.subCategories);
          console.log(this.product.images)

          this.product.images.forEach(
            data=>{
              const imageUrl = 'http://localhost:8080/images/'+data.imageName;
              const fileName = data.imageName.toString();
              console.log('http://localhost:8080/images/'+data.imageName)
              // this.imagePreviews.push('http://localhost:8080/images/'+data.imageName);
              this.imageUrlService.downloadImageAsFile('http://localhost:8080/images/'+data.imageName, data.imageName.toString())
              .then(file => {
                  console.log('Image downloaded and converted to file:', file);
                  this.imageFiles.push(file)
                  console.log(file)
                  const reader = new FileReader();
                  reader.onload = () => {
                    this.imagePreviews.push(reader.result as string); // Push the image preview
                  };
                  reader.readAsDataURL(file); // Read the file as Data URL
                  // You can now use the file object
                })
                .catch(error => {
                  console.error('Error:', error);
                });
            }
          // this.imageUrlService.downloadImageAsFile(imageUrl, fileName)
          // .then(file => {
          //   console.log('Image downloaded and converted to file:', file);
          //   // You can now use the file object
          // })
          // .catch(error => {
          //   console.error('Error:', error);
          // });
        );
        //  const value = subCategory[0].categoryName;
      //  // console.log(this.productForm.get('subCategory')?.value)
      //  const filteredArray = this.subCategories.filter(element => element.categoryName === value);
      //  console.log(filteredArray); // Output: [3]
         this.productForm.get('subCategory')?.patchValue(subCategory[0]);
          this.productForm.get('brand')?.patchValue(brand[0]);
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
   //  const subCategory:Subcategory []=   JSON.parse(JSON.stringify(this.product.subCategory));
     //const brand:Brand [] =   JSON.parse(JSON.stringify(this.product.brand));
    // console.log(brand[0].brandName)
    this.productForm.patchValue({

    sku : this.product.sku ,
    name:  this.product.name,
    description : this.product.description,
    unitPrice  :  this.product.unitPrice?.toString() ,
    active : '1',
    unitsInStock  :  this.product.unitsInStock?.toLocaleString(),
    subCategory: JSON.parse(JSON.stringify(this.product.subCategory)) ,
    brand: JSON.parse(JSON.stringify(this.product.brand))

   })
   //this.productForm.get('subCategory')?.setValue(subCategory[0]);
 //  console.log("Subcategory:" +   JSON.stringify(this.product.subCategory));


  }

  private prepareFormData(product: Product,  imageFiles: File[]): FormData {

    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(this.product)], { type: 'application/json' })
    );

     // Append images (file[] array)
     imageFiles.forEach(file => {
      formData.append('imageFile', file);
    });
    // for (const file of  imageFiles) {
    //   formData.append('imageFile', file);
    // }

  //         // Assuming selectedFiles is an array of File objects
  // this.imagePreviews.forEach((file, index) => {
  //   formData.append(`imageFile${index}`, file);  // Append each file individually
  // });

    // for (var i = 0; i < product.imageData.length; i++) {
    //   formData.append(
    //     'imageFile',

    //     //  product.imageData[i].file,
    //     //  product.imageData[i].file.name
    //   );
    // }

    return formData;

  }


  //*********** From data  End************* */




  //Populate Subcategories

  private getSubcategories() {
    this.productSerive.getAllSubCategories().subscribe(
      data => {
        this.subCategories = data;
        console.log(data)
       this.productForm.get('subCategory')?.setValue(data[0]);

      }
    );
  }

  public loadSubCategories(){
   // this.getSubcategories();
    console.log("load")
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
public fileDroppedFromInput(event: Event) {
  const input = event.target as HTMLInputElement; // Cast event.target to HTMLInputElement
  const files = input.files; // Now files is recognized as FileList

  if (files && files.length > 0) {
    const fileArray = Array.from(files); // Convert FileList to File[]
    this.fileDropped(fileArray); // Call the fileDropped method
  } else {
    console.error("No files selected.");
  }
}

public fileDropped(files: File[]) {
  if (files && files.length > 0) {
    this.selectedFiles = Array.from(files); // Store the files in an array
    //this.imageFiles = this.selectedFiles;
    // Create image previews for each file
    files.forEach(file => {
      this.imageFiles.push(file)
      console.log(file)
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews.push(reader.result as string); // Push the image preview
      };
      reader.readAsDataURL(file); // Read the file as Data URL
    });

    console.log("imageFiles:" + this.imageFiles)
    console.log("imagePreviews:" + this.imagePreviews)
  } else {
    console.error("No files dropped or selected.");
  }
}



  public removeImages(i:number){
    this.imageFiles.splice(i,1);
    this.imagePreviews.splice(i,1);
    console.log("imageFiles:" + this.imageFiles)
    console.log("imagePreviews:" + this.imagePreviews)

  }

  //********** File Handle End ****** */






  public onSubmit() {

    //Assigning the data to the poduct
    this.updateProduct();
    // console.log(this.productForm.value);
   // this.product = this.productForm.value;
    console.log(this.product);

    const productFormData = this.prepareFormData(this.product, this.imageFiles)

    console.log(this.product)
     console.log(productFormData)

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
