import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { TicketSimple } from 'src/app/interfaces/ticket-simple.interface';
import { TicketService } from 'src/app/services/ticket.service';
import {MatDialog} from '@angular/material/dialog';
import { ClientComponent } from 'src/app/components/client/client.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  pageEvent!: PageEvent;
  ticket$=this.ticketService.ticket$;
  ticket_items!:Product[];
  total:number=0;
  code!:string;
  client_code:string="XXXXXXXXXX";
  constructor(private ticketService:TicketService,public dialog: MatDialog ,public _snackBar:MatSnackBar) { 
    
  }



  ngOnInit(): void {
    this.ticket$.subscribe(
      (ticket: TicketSimple) => {
        this.ticket_items=ticket.products;
        this.total=ticket.total;
        this.code=`${ticket.date.getFullYear()}${ticket.date.getMonth()+1<9?0:""}${ticket.date.getMonth()+1}${"0".repeat(8-Math.ceil(Math.log10(ticket.count+1)))}${ticket.count+1}`;
        
        if(ticket.client){
          this.client_code=ticket.client.code;
        }
      });

      
  }
  
  updateTicket(event:any): void {
    if(event.operation=='delete'){
      this.ticketService.deleteProductTicket(event.product);
    }
    if(event.operation=='addQuantity'){
      this.ticketService.addQuantity(event.product);
    }
    if(event.operation=='removeQuantity'){
      this.ticketService.removeQuantity(event.product);
    }
    if(event.operation=='setQuantity'){
      this.ticketService.setQuantity(event.product,event.quantity);
    }
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(ClientComponent);
    dialogRef.componentInstance.is_client=true;
    dialogRef.componentInstance.crud=false;
    dialogRef.componentInstance.father='dialog';
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }


  confirmSell(){
     this.ticketService.setCodeTicket(this.code);
     this.ticketService.postTicket().subscribe({
       next:(data:any)=>{this.ticketService.postTicketOperation(data.value.id)},
       error:()=>{this.snackBar("Error al confirmar la venta,debe seleccionar un cliente.");},
       complete:()=>{
         this.snackBar("Venta exitosa.");
         this.client_code="XXXXXXXXXX";
         this.ticketService.resetTicket();
         this.ngOnInit();
        },
     })
      
    
  }
  snackBar(msg:string): void {
    this._snackBar.open(msg, 'close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
    setTimeout(() => {
      this._snackBar.ngOnDestroy();
    }, 3000);
  }
  

}
