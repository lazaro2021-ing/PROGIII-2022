export interface Province{
    id:number;
    name:string;
}


export interface State{
    id:number;
    fK_Province:number;
    name:string;
}

export interface City{
    id:number;
    fK_State:number;
    name:string;
}