import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { TableProfit } from 'src/app/interfaces/ticket-simple.interface';
import { ProductsService } from 'src/app/services/products.services';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-top-product-sell',
  templateUrl: './top-product-sell.component.html',
  styleUrls: ['./top-product-sell.component.css'],
})
export class TopProductSellComponent {
  constructor(private productService: ProductsService) {}
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() data!: TableProfit[];
  years!: string[];
  year_selected: string = '2012';

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          font: {
            size: 40,
          },
        },
      },
      datalabels: {
        formatter: (value, ctx) => {
          let percentage;

          let sum = 0;
          let dataArr: any[] = ctx.chart.data.datasets[0].data;
          dataArr.map((data: number) => {
            sum += data;
          });
          percentage = ((value * 100) / sum).toFixed(2);

          return percentage + '%';
        },
        font: {
          size: 25,
        },
      },
    },
  };
  public pieChartLabels: string[] = [];
  public pieChartPlugins = [DatalabelsPlugin];
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#84b6f4',
          '#a0d2f3',
          '#95fab9',
          '#f4fab4',
          '#f7cae4',
          '#f9d99a',
          '#f9a59a',
          '#fa5f49',
          '#f79ae5',
          '#9b9b9b',
        ],
      },
    ],
  };

  public pieChartType: ChartType = 'pie';

  ngOnInit(): void {
    this.years = [
      ...new Set(
        this.data.map((elem) => {
          return `${elem.yyear}`;
        })
      ),
    ];

    this.data.forEach((elem, i) => {
      console.log(elem);

      if (elem.yyear.toString() === this.years[0]) {
        this.pieChartLabels.push(elem.product);
        this.pieChartData.datasets[0].data.push(elem.profit);
      }
    });
    this.pieChartData.labels = this.pieChartLabels;
    this.chart?.update();
  }

  topYear(year: string) {
    this.year_selected = year;
    this.pieChartLabels = [];
    this.pieChartData.datasets[0].data = [];
    this.data.forEach((elem, i) => {
      if (elem.yyear.toString() == year) {
        this.pieChartLabels.push(elem.product);
        this.pieChartData.datasets[0].data[i] = elem.profit;
      }
    });

    this.pieChartData.labels = this.pieChartLabels;
    this.chart?.render();
  }
}
