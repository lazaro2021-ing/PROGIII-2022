import { City, Province, State } from "./geo.interface";

export interface Person{

    id:number;
    name:string;
    fK_Address:number;
    email:string;
    telephone:string;
    is_Client:boolean;
    is_Supplier:boolean;
    document_number:string;
    document_type:string;
    code:string;
}

export interface Address{
    id:number;
    fK_City:number;
    street:string;
    number:number;
    floor:string;
    apartment:string;
}

export interface GeoData{
    city:City;
    state:State;
    province:Province;
}