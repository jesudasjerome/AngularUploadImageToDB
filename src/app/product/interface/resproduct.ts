import { FileHandle } from "./file-handle";

export interface Resproduct {
    sku: string ;
    name: string ;
    description: string;
    unitPrice: string ;
    active: boolean;
    unitsInStock: number;
    imageData:[]
    productImages: FileHandle[]
}
