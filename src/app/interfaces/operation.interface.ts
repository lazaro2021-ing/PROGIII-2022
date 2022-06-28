import { Product } from "./product.interface";

export interface Operation{
    quantity: number,
    fK_Product: number,
    fK_Ticket: number,
    fK_Type_Operation: number,
    subTotal:number,
    product:Product
}