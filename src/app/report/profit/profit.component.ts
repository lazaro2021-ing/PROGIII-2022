import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TableProfit } from 'src/app/interfaces/ticket-simple.interface';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.css']
})
export class ProfitComponent  implements OnInit{

  constructor(private ticketService:TicketService) { }

  @Input() profit_data!:TableProfit[];
  @Input()profit_data_month!:TableProfit[];
  years! :string[];
  months:string[]=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  year_selected!:string;
  public barChartLabels: string[] = [ ];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      { data: [ ], label: 'Ganancias' },
      { data: [ ], label: 'Ventas' },
      
    ]
  };
  ngOnInit(): void {
      this.profit_data.forEach((elem,i)=>{
        this.barChartLabels[i]=`${elem.yyear}`
        this.barChartData.datasets[0].data[i]=elem.profit
        this.barChartData.datasets[1].data[i]=elem.total
      });
      this.years=this.barChartLabels
      
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.4
      }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: { display: true },
      
    }
  };
  


  profitYear(year:string){
    this.year_selected=year
    this.barChartData.labels=this.months
    this.profit_data_month.forEach((elem,i)=>{
      if(year==elem.yyear.toString()){
        this.barChartData.datasets[0].data[elem.mmonth-1]=elem.profit
        this.barChartData.datasets[1].data[elem.mmonth-1]=elem.total
      }
      
    });
   

    if(this.chart){this.chart.ngOnChanges({});}
    
  }

  pdf(){

  }

 
}

