import { Component, OnInit } from '@angular/core';
import { TableProfit, TableProvince } from 'src/app/interfaces/ticket-simple.interface';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  

  graph_profit: boolean = false;
  graph_top_ten_product: boolean = false;
  graph_client_map: boolean = false;
  progres: boolean = false;
  profit_data!: TableProfit[];
  profit_data_month!: TableProfit[];
  top_ten_product_data!: TableProfit[];
  province_data!:TableProvince[];

  constructor(private ticketService: TicketService) {}
  
  ngOnInit(): void {}

  profitChart() {
    this.graph_top_ten_product = false;
    this.graph_client_map=false;
    this.progres = true;
    this.ticketService.getProfits().subscribe({
      next: (data: TableProfit[]) => {
        this.profit_data = data;
      },
      complete: () => {
        if (this.graph_profit == false) {
          this.graph_profit = true;
        }
        this.progres = false;
      },
    });

    this.ticketService.getProfitsDetails().subscribe({
      next: (data: TableProfit[]) => {
        this.profit_data_month = data;
      },
      complete: () => {},
    });
  }

  topTenProductsChart() {
    this.graph_client_map= false;
    this.graph_profit = false;
    this.progres = true;
    this.ticketService.getTopTenProducts().subscribe({
      next: (data: TableProfit[]) => {
        this.top_ten_product_data = data;
      },
      complete: () => {
        if (this.graph_top_ten_product == false) {
          this.graph_top_ten_product = true;
        }
        this.progres = false;
      },
    });
  }

  clientMap(){
    this.graph_profit = false;
    this.graph_top_ten_product=false
    this.ticketService.getProvinceCountClient().subscribe({
      next: (data: TableProvince[]) => {
        this.province_data = data;
        console.log("data")
      },
      complete: () => {
        if (this.graph_client_map == false) {
          this.graph_client_map = true;
        }
        this.progres = false;
      },
    })

  }
}
