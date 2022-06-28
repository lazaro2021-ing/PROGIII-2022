import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { ReportComponent } from './report/report/report.component';
import { SaleComponent } from './sale/sale.component';
import { SellComponent } from './sell/sell.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'sell', component: SellComponent },
      { path: 'report', component: ReportComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'clients', component: ClientComponent },
      { path: 'suppliers', component: SupplierComponent },
      { path: 'sale', component: SaleComponent }
      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
