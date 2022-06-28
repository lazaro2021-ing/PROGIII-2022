import { HttpClient } from '@angular/common/http';
import { Type } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, Observable, Subject } from 'rxjs';
import { Person } from '../interfaces/person.interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class PersonsService {
  constructor(private http: HttpClient) {}

  private personSubject = new Subject<Person[]>();
  private supplierAddProductSubjet=new Subject<Person>();

  // obtiene todas las personas
  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${environment.apiUrl}/person`);
  }

  // obtiene la persona con el id
  getPersonsById(id:number):Observable<Person>{
    return this.http.get<Person>(`${environment.apiUrl}/person/${id}`);
  }

  // obtiene todas las personas que son cliente o supplier
  getPersonByType(type:boolean): Observable<Person[]> {
    return this.http.get<Person[]>(`${environment.apiUrl}/person?is_client=${type}`);
  }

  //guarda una persona
  postPerson(person: FormGroup): Observable<Person> {
    
    return this.http.post<Person>(`${environment.apiUrl}/person`, {
      name: person.value.name,
      fK_Address: person.value.fk_address,
      email: person.value.email,
      telephone: person.value.telephone,
      is_Client: person.value.is_Client,
      is_Supplier: person.value.is_Supplier,
      document_number: person.value.document_number,
      document_type: person.value.document_type,
    });
  }

  //actualiza una persona
  updatePerson(person: FormGroup): Observable<Person> {
    
    return this.http.put<Person>(`${environment.apiUrl}/person/${person.value.id_person}`, {
      id:person.value.id_person,
      name: person.value.name,
      fK_Address: person.value.fk_address,
      email: person.value.email,
      telephone: person.value.telephone,
      is_Client: person.value.is_Client,
      is_Supplier: person.value.is_Supplier,
      document_number: person.value.document_number,
      document_type: person.value.document_type,
      code:person.value.code
    });
  }


  get persons$(): Observable<Person[]> {
    return this.personSubject.asObservable();
  }

  get supplierAddProduct$(): Observable<Person> {
    return this.supplierAddProductSubjet.asObservable();
  }

  setSupplierToProduct(supplier: Person): void {
    this.supplierAddProductSubjet.next(supplier);
  }
}
