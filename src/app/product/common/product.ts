import { Brand } from './brand';
import { Subcategory } from './subcategory';
import { FileHandle } from "../interface/file-handle";

export class Product {
  constructor(
    public sku: string,
    public name: string,
    public description: string,
    public unitPrice: string ,
    public active: boolean,
    public unitsInStock: number,
    public imageData:[]
  ){}


}
