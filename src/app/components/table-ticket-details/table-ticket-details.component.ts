import { INPUT_MODALITY_DETECTOR_DEFAULT_OPTIONS } from '@angular/cdk/a11y';
import { Component, Input, OnInit } from '@angular/core';
import { Operation } from 'src/app/interfaces/operation.interface';
import { ProductsService } from 'src/app/services/products.services';



@Component({
  selector: 'app-table-ticket-details',
  templateUrl: './table-ticket-details.component.html',
  styleUrls: ['./table-ticket-details.component.css']
})


export class TableTicketDetailsComponent implements OnInit {
  displayedColumns: string[] = ['fK_Product', 'quantity','price' ,'subTotal'];
  @Input() ticketDetails!:Operation[] ;
  dataSource:any[]=[] ;
  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    this.ticketDetails.forEach(element => {
      this.dataSource.push({product:element.product.name,
                            quantity:element.quantity,
                            price:element.subTotal/element.quantity,
                            subTotal:element.subTotal})
    });


  }

}
