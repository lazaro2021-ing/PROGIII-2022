export interface Product {
    id:number,
    name:string,
    code:string,
    stock:number,
    price_Now:number,
    detail:string,
    fK_Type:number,
    fK_Unit:number,
    price_Buy:number,
    profit:number,
    fK_Person:number,
    quantity:number
  }

  export interface ProductType{
    id:number;
    type_Name:string;
  }

  export interface ProductUnit{
    id:number;
    unit_Name:string;
  }

  export interface FindProduct{
    name:string;
    code:string;
    type:number;
  }