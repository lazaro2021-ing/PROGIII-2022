import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Type } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address, GeoData } from '../interfaces/person.interface';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  //obtiene la direccion con id=id
  getAddress(id: number): Observable<Address> {
    return this.http.get<Address>(`${environment.apiUrl}/Addresses/${id}`);
  }

  // obtiene la geodata de la ciudad con id=idcity
  getGeoData(idCity: number): Observable<GeoData> {
    return this.http.get<GeoData>( `${environment.apiUrl}/Geo/${idCity}`);
  }

  //guarda una direccion
  postAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${environment.apiUrl}/Addresses`, {
      fK_City: address.fK_City,
      street: address.street,
      number: address.number,
      floor: address.floor,
      apartment: address.apartment,
    });
  }
  
  //actualiza una direccion
  updateAddress(address: Address): Observable<Address> {
    return this.http.put<Address>(`${environment.apiUrl}/Addresses/${address.id}`, {
      id:address.id,
      fK_City: address.fK_City,
      street: address.street,
      number: address.number,
      floor: address.floor,
      apartment: address.apartment,
    });
  }
}
