
import { Image } from "./image";

export interface Resproduct {
  sku: string ;
  name: string ;
  description: string;
  unitPrice: string ;
  active: boolean;
  unitsInStock: number;
  subCategory: string [];
  brand: string[];
  images: Image[]
}
