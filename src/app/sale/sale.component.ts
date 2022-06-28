import { Component, OnInit } from '@angular/core';
import { TicketSimple } from '../interfaces/ticket-simple.interface';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  constructor(private ticketService:TicketService) { }
  tickets!:TicketSimple[];
  ngOnInit(): void {
  }
  findTicket($event:any){
    console.log('kakakka',$event)
    this.ticketService.findTicketByDateDocument($event).subscribe((result:TicketSimple[])=>this.tickets=result);
    console.log(this.tickets)
  }

}
