import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import {  ProductType } from '../interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TypeProductsService {
  constructor(private http:HttpClient) { }

  typesProduct:any= [];

  getTypesProducts():{}{
    const unit_request=this.http.get<ProductType[]>(`${environment.apiUrl}/types`);
    unit_request.subscribe((units: ProductType[]) => {
      units.forEach((element) => {
        this.typesProduct.push({id:element.id,'type':element.type_Name})
      });
    });
    
    return this.typesProduct;
  }

  
}