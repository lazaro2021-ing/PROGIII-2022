import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Operation } from '../interfaces/operation.interface';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private http: HttpClient) { }

  getOperationByTicketId(id:number): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${environment.apiUrl}/operations/byticket?id=${id}`);
  }

  postOperation(quantity:number,fK_Product: number,fk_Ticket: number,fK_Type_Operaciont: number) :Observable<Operation>{
     return this.http.post<Operation>(`${environment.apiUrl}/operations`, {
     quantity: quantity,
     fK_Product: fK_Product,
     fk_Ticket: fk_Ticket,
     fK_Type_Operaciont: fK_Type_Operaciont
   })
  }
}
