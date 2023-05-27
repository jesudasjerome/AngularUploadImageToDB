import { FileHandle } from "./file-handle";

export interface Product {
    sku: string ;
    name: string ;
    description: string;
    unitPrice: string ;
    active: boolean;
    unitsInStock: number;
    productImages: FileHandle[]
}
