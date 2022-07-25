import { HttpClient } from '@angular/common/http';
import { Type } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Product, ProductType } from '../interfaces/product.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl='/api/products';
  constructor(private http:HttpClient) { }

  private productSubject = new Subject<Product[]>();

  //obtiene todos los porductos
  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  //obtiene un producto por id
  getProduct(id:number):Observable<Product>{
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }

  //guarga una producto
  postProduct(product:FormGroup): Observable<Product>{
    
    return this.http.post<Product>(`${environment.apiUrl}/products`, {
      name: product.value.name,
      stock: parseInt(product.value.stock),
      price_Now: parseFloat( product.value.price_Sell),
      detail: product.value.detail,
      fK_Type: parseInt(product.value.type),
      fK_Unit: parseInt(product.value.unit),
      price_Buy: parseFloat( product.value.price_Buy),
      profit:0,
      fK_Person:parseInt(product.value.supplier_id)
    });
  }

  //actualiza un producto
  updateProduct(product:FormGroup): Observable<Product>{
    return this.http.put<Product>(`${environment.apiUrl}/products/${product.value.id}`, {
      id:product.value.id,
      name: product.value.name,
      stock: parseInt(product.value.stock),
      price_Now: parseFloat( product.value.price_Sell),
      detail: product.value.detail,
      fK_Type: parseInt(product.value.type),
      fK_Unit: parseInt(product.value.unit),
      price_Buy: parseFloat( product.value.price_Buy),
      profit:0,
      fK_Person:parseInt(product.value.supplier_id)
    });
  }

  get product$(): Observable<Product[]> {
    return this.productSubject.asObservable();
  }

  updateProducts(products:Product[]):void{
    this.productSubject.next(products);
  }
  
}