import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { City, Province, State } from '../interfaces/geo.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GeoService {
  constructor(private http:HttpClient) { }

  //obtiene todas las provincias de argentina
  getProvinces():Observable<Province[]>{
    return this.http.get<Province[]>(`${environment.apiUrl}/geo/provinces`);
  }

  //obtiene todos los departamentos de la provincia con id_province
  getStates(id_province:number):Observable<State[]>{ 
    return this.http.get<State[]>(`${environment.apiUrl}/geo/StatesByProvince?id_province=${id_province}`);
  }

 //obtiene todas las ciudades del departamento con  id_state
  getCitys(id_state:number):Observable<City[]>{
    return this.http.get<City[]>(`${environment.apiUrl}/geo/CityByState?id_state=${id_state}`);
  }

}