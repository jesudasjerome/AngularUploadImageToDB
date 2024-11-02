import { FileHandle } from "./file-handle";
import { Image } from "./image";

export interface Product {
    sku: string ;
    name: string ;
    description: string;
    unitPrice: string ;
    active: boolean;
    unitsInStock: number;
    subCategory: string [];
    brand: string[];
    images: Image[];
    imageData:FileHandle[];
//    productImages: FileHandle[]
}
