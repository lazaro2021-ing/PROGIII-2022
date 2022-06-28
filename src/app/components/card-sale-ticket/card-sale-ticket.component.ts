import { Component, HostListener, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Operation } from 'src/app/interfaces/operation.interface';
import { TicketSimple } from 'src/app/interfaces/ticket-simple.interface';
import { OperationService } from 'src/app/services/operation.service';


@Component({
  selector: 'app-card-sale-ticket',
  templateUrl: './card-sale-ticket.component.html',
  styleUrls: ['./card-sale-ticket.component.css']
})

export class CardSaleTicketComponent implements OnInit {
  panelOpenState: boolean = false;
  crud:Boolean=true;
  @Input() ticket!: TicketSimple;
  innerWidth!: number;
  ticketDetails!:Operation[];

  constructor(private operationService:OperationService) { }

 

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
  this.innerWidth = window.innerWidth;
  }
  
  editTicket(ticket:TicketSimple){

  }

  openPanelChange(){
    this.panelOpenState=!this.panelOpenState;
    if(this.panelOpenState){
     
      this.operationService.getOperationByTicketId(this.ticket.id).subscribe((result:Operation[])=>{
       this.ticketDetails=result;
      });
     
      
    }
  }

  

}
