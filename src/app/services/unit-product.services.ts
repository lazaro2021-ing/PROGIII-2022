import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import {  ProductType, ProductUnit } from '../interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UnitsProductsService {
  constructor(private http:HttpClient) { }
  unitsProduct: any=[{}];

  getUnitsProducts():{}{
    const unit_request=this.http.get<ProductUnit[]>(`${environment.apiUrl}/units`);
    unit_request.subscribe((units: ProductUnit[]) => {
      units.forEach((element) => {
        this.unitsProduct.push({id:element.id,'unit':element.unit_Name})
      });
    });
    return this.unitsProduct;
  }
  
}