import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./MaterialModule";
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { SellComponent } from './sell/sell.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { CardTicketComponent } from './components/card-ticket/card-ticket.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { RouterModule } from '@angular/router';
import { FindProductComponent } from './components/find-product/find-product.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientComponent } from './components/client/client.component';
import { FindClientComponent } from './components/find-client/find-client.component';
import { CardClientComponent } from './components/card-client/card-client.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TopProductSellComponent } from './report/top-product-sell/top-product-sell.component';
import { ReportComponent } from './report/report/report.component';
import { NgChartsModule } from 'ng2-charts';
import { ProfitComponent } from './report/profit/profit.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NguiMapModule} from '@ngui/map';
import { ProvinceCountClientComponent } from './report/province-count-client/province-count-client.component';
import { HomeComponent } from './components/home/home.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { SaleComponent } from './sale/sale.component';
import { FindTicketComponent } from './components/find-ticket/find-ticket.component';
import { CardSaleTicketComponent } from './components/card-sale-ticket/card-sale-ticket.component';
import { TableTicketDetailsComponent } from './components/table-ticket-details/table-ticket-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    SellComponent,
    TicketComponent,
    CardTicketComponent,
    CardProductComponent,
    FindProductComponent,
    ClientComponent,
    FindClientComponent,
    CardClientComponent,
    AddClientComponent,
    TopProductSellComponent,
    ReportComponent,
    ProfitComponent,
    ProvinceCountClientComponent,
    HomeComponent,
    AddProductComponent,
    SupplierComponent,
    SaleComponent,
    FindTicketComponent,
    CardSaleTicketComponent,
    TableTicketDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule ,
    ReactiveFormsModule,
    NgChartsModule,
    PdfViewerModule,
    NguiMapModule.forRoot({apiUrl: `https://maps.google.com/maps/api/js?key=${environment.google_maps_key}`}),
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
