import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-card-ticket',
  templateUrl: './card-ticket.component.html',
  styleUrls: ['./card-ticket.component.css']
})
export class CardTicketComponent implements OnInit {
  quantity!:number;
  @Input() product!:Product;
  @Output() updateTicketClick = new EventEmitter<{product:Product,operation:string,quantity:number}>();
  constructor(private ticketService:TicketService) { }
  ngOnInit(): void {
    
  }

  updateTicket(ope:string):void{
    
    this.updateTicketClick.emit({product:this.product,operation:ope,quantity:this.quantity});
  }

  

}
