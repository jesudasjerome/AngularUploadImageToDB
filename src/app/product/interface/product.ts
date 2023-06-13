import { FileHandle } from "./file-handle";

export interface Product {
    sku: string ;
    name: string ;
    description: string;
    unitPrice: string ;
    active: boolean;
    unitsInStock: number;
    subCategories: string [];
    brand: string[];
    imageData:FileHandle[]
 //   productImages: FileHandle[]
}
