import { NumberSymbol } from "@angular/common";
import { Person } from "./person.interface";
import { Product } from "./product.interface";

export interface TicketSimple{
    id:number;
    total:number;
    date:Date; 
    id_comprador:number;
    type_Operation:number;
    code:string;
    products:Product[];
    count:number;
    client:Person;
}

export interface TableProfit{
    id:number;
    yyear:number;
    profit:number;
    mmonth:number;
    total:number;
    product:string;
}

export interface TableProvince{
    id:number;
    province_Name:string;
    count_P:number
}