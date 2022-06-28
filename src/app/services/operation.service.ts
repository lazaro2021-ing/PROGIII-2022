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
}
