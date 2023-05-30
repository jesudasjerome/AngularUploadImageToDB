import { Injectable } from '@angular/core';
import { Product } from '../interface/product';
import { FileHandle } from '../interface/file-handle';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingServiceService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(product: Product) {

    const prdocuctImages: any[] = product.imageData;

    const poductImageToFileHandle: FileHandle[] = [];

    for (let i = 0; i < prdocuctImages.length; i++) {
      const imageFileData = prdocuctImages[i];

      const imageBlob = this.dataURItoBlob(imageFileData.data, imageFileData.type);

      const imageFile = new File([imageBlob], imageFileData.imageName, { type: imageFileData.type });

      const fileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      poductImageToFileHandle.push(fileHandle);
    }

    product.productImages = poductImageToFileHandle;

    return product;
  }

  public dataURItoBlob(imageData: any, imageType: any) {
    const byteString = window.atob(imageData);
    const arryBuffer = new ArrayBuffer(byteString.length);
    const int8Arry = new Int8Array(arryBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Arry[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Arry], { type: imageType });
    return blob;

  }
}
