import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Operation } from '../interfaces/operation.interface';
import { Person } from '../interfaces/person.interface';
import { Product, ProductType } from '../interfaces/product.interface';
import { TableProfit, TableProvince, TicketSimple } from '../interfaces/ticket-simple.interface';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TicketService implements OnInit {
  
  ticket: TicketSimple = {} as TicketSimple;
  ticketSubjet = new Subject<TicketSimple>();

  constructor(private http: HttpClient) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.ticket.type_Operation = 0;
    this.ticket.total = 0;
    this.ticket.date = new Date();
    this.ticket.products = new Array<Product>();
    this.getCount().subscribe((count) => (this.ticket.count = count));
  }

  //obtiene la cantidad de tickets
  getCount() {
    return this.http.get<number>(`${environment.apiUrl}/tickets/count`);
  }

  //reportes
  getProfits(): Observable<TableProfit[]>{
    return this.http.get<TableProfit[]>(`${environment.apiUrl}/tickets/report?report=ProfitByYear`);
  }

  getProvinceCountClient(): Observable<TableProvince[]>{
    return this.http.get<TableProvince[]>(`${environment.apiUrl}/person/report?report=ClientProvinceCount`);
  }

  getProfitsDetails(): Observable<TableProfit[]>{
    return this.http.get<TableProfit[]>(`${environment.apiUrl}/tickets/report?report=ProfitByYearWithDetails`);
  }

  getTopTenProducts(): Observable<TableProfit[]>{
    return this.http.get<TableProfit[]>(`${environment.apiUrl}/tickets/report?report=TopTenProduct`);
  }

  findTicketByDateDocument(search:FormGroup):Observable<TicketSimple[]>{
    const start=search.value.start.toJSON().split("-")
    const end=search.value.end.toJSON().split("-")
    const dateStart=`${start[0]}/${start[1]}/${start[2].split('T')[0]}`
    const dateEnd=`${end[0]}/${end[1]}/${end[2].split('T')[0]}`
    console.log(dateStart,dateEnd)
    return this.http.get<TicketSimple[]>(`${environment.apiUrl}/tickets/find?start=${dateStart}&end=${dateEnd}&document=${search.value.document_number}`);
  }


  //guarda un ticket
  postTicket(): Observable<TicketSimple> {
    return this.http.post<TicketSimple>(`${environment.apiUrl}/tickets`, {
      fK_Type_Operation:0,
      fK_Person:this.ticket.id_comprador,
      code:this.ticket.code
    });
  }

  //guarda los detalles del ticket
  postTicketOperation(id_ticket:number):void{
    this.ticket.products.forEach((prod:Product) => {
      return this.http.post<Operation>(`${environment.apiUrl}/operations`, {
       quantity:prod.quantity,
       fK_Product:prod.id,
       fk_Ticket:id_ticket,
       fK_Type_Operaciont:0
      }).subscribe({
        next:(data)=>console.log(data)
      });
    });

    
  }

  get ticket$(): Observable<TicketSimple> {
    return this.ticketSubjet.asObservable();
  }

  //agrega un producto al ticket
  public addProductToTicket(product: Product): void {
    const product_index = this.ticket.products.findIndex(
      (o) => o.code == product.code
    );
    if (product_index < 0) {
      product.quantity = 1;
      this.ticket.products.push(product);
      this.ticket.total += product.price_Now;
    } else {
      this.ticket.products[product_index].quantity += 1;
      this.ticket.total += product.price_Now;
    }

    this.ticketSubjet.next(this.ticket);
  }

  //borra un producto del ticket
  deleteProductTicket(product: Product): void {
    const index = this.ticket.products.findIndex(
      (item) => item.id == product.id
    );
    this.ticket.products.splice(index, 1);
    this.ticket.total -= product.price_Now * product.quantity;
    this.ticketSubjet.next(this.ticket);
  }

  //agrega cantidad al ticket
  addQuantity(product: Product): void {
    const index = this.ticket.products.findIndex(
      (item) => item.id == product.id
    );
    this.ticket.products[index].quantity += 1;
    this.ticket.total += product.price_Now;
    this.ticketSubjet.next(this.ticket);
  }

  //resta una cantidad al ticket
  removeQuantity(product: Product): void {
    const index = this.ticket.products.findIndex(
      (item) => item.id == product.id
    );
    if (this.ticket.products[index].quantity > 1) {
      this.ticket.products[index].quantity -= 1;
      this.ticket.total -= product.price_Now;
      this.ticketSubjet.next(this.ticket);
    }
  }

  //setea una cantidad de producto al ticket
  setQuantity(product: Product, quantity: number): void {
    if (quantity >= 0) {
      const index = this.ticket.products.findIndex(
        (item) => item.id == product.id
      );
      this.ticket.total -= product.price_Now * product.quantity;
      this.ticket.total += product.price_Now * quantity;
      this.ticket.products[index].quantity = quantity;
      this.ticketSubjet.next(this.ticket);
    }
  }

  //setea el cliente al ticket
  setClientToTicket(client: Person): void {
    this.ticket.id_comprador = client.id;
    this.ticket.client = client;
    this.ticketSubjet.next(this.ticket);
  }

  //setea el codigo al ticket
  setCodeTicket(code:string){
    this.ticket.code=code;
    this.ticketSubjet.next(this.ticket);
  }

  //reset ticket
  resetTicket(){
    this.ticket = {} as TicketSimple;
    this.ngOnInit();
    this.ticketSubjet.next(this.ticket);
  }

  
}
