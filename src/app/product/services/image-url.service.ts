import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageUrlService {


  constructor(private http: HttpClient) { }

  // Method to download image as Blob and convert to File
  downloadImageAsFile(imageUrl: string, fileName: string): Promise<File> {
   return this.http.get(imageUrl, { responseType: 'blob' }).toPromise()
     .then(blob => {
       // Check if the blob exists and is valid
       if (!blob) {
         throw new Error('No blob returned from the server');
       }

       // Create a File object from the Blob
       const file = new File([blob], fileName, { type: blob.type || 'application/octet-stream' });
       return file;
     })
     .catch(err => {
       console.error('Error downloading the image:', err);
       throw err;
     });
   }
}
