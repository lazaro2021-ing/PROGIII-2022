import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { FindProduct, Product, ProductType, ProductUnit } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.services';
import { TicketService } from '../../services/ticket.service';
import { TypeProductsService } from '../../services/types-product.service';
import { UnitsProductsService } from '../../services/unit-product.services';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  @Input() crud:boolean=true;
  typesProduct: any={};
  unitsProduct: any=[];
  products!: Product[];
  protected all_products!: Product[];

  constructor(
    private productService: ProductsService,
    private typeProductService: TypeProductsService,
    private unitsProductService: UnitsProductsService,
    private ticketService:TicketService
  ) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((products: Product[]) => {
        this.products = products;
        this.all_products = this.products;
      });

    this.typesProduct=this.typeProductService.getTypesProducts();
    this.unitsProduct= this.unitsProductService.getUnitsProducts()
    
      }
      

  findProduct(find: FindProduct): void {
    let product_filtrado!: Product[];
    if(find.name==""){product_filtrado=this.all_products}
    if (find.name) {
      product_filtrado = this.all_products.filter(
        (fil) => fil.name.slice(0, find.name.length).toLowerCase() == find.name.toLowerCase()
      );
    }
    if (find.code && product_filtrado) {
      product_filtrado = product_filtrado.filter(
        (fil) => fil.code.slice(0, find.code.length).toLowerCase() == find.code.toLowerCase()
      );
    }
    if (find.code && !product_filtrado) {
      product_filtrado = this.all_products.filter(
        (fil) => fil.code.slice(0, find.code.length).toLowerCase() == find.code.toLowerCase()
      );
    }
    if (find.type && product_filtrado) {
      product_filtrado = product_filtrado.filter(
        (fil) => fil.fK_Type == find.type
      );
    }
    if (find.type && !product_filtrado) {
      product_filtrado = this.all_products.filter(
        (fil) => fil.fK_Type == find.type
      );
    }
    this.products = product_filtrado;
  }

  addProductToTicketClick(product: Product): void {
    this.ticketService.addProductToTicket(product);
  }
  
}
