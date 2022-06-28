import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { PersonsService } from 'src/app/services/person.services';
import { ThisReceiver } from '@angular/compiler';
import { Person } from 'src/app/interfaces/person.interface';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
})
export class CardProductComponent implements OnInit {
  panelOpenState: boolean = false;
  innerWidth!:number;
  @Input() product!: Product;
  @Input() crud!:Boolean;
  @Output() addProductoToTicketClick = new EventEmitter<Product>();
  @Input() typesProduct: any = {};
  @Input() unitsProduct: any = {};
  constructor(private _snackBar: MatSnackBar,public dialog: MatDialog,private personService:PersonsService) {}

  ngOnInit(): void {}

  @HostListener('window:resize', ['$event'])
  onResize() {
  this.innerWidth = window.innerWidth;
  }

  addProductToTicket(): void {

    this.addProductoToTicketClick.emit(this.product);
    this.snackBar();
  }

  snackBar(): void {
    this._snackBar.open('Producto agregado correctamente.', 'close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
    setTimeout(() => {
      this._snackBar.ngOnDestroy();
    }, 2000);
  }

  editProduct(product:Product){
    const dialogRef = this.dialog.open(AddProductComponent);
    dialogRef.componentInstance.is_update=true
    dialogRef.componentInstance.set_param("id",product.id)
    dialogRef.componentInstance.set_param("name",product.name)
    dialogRef.componentInstance.set_param("type",product.fK_Type)
    dialogRef.componentInstance.set_param("unit",product.fK_Unit)
    dialogRef.componentInstance.set_param("detail",product.detail)
    dialogRef.componentInstance.set_param("price_Buy",product.price_Buy)
    dialogRef.componentInstance.set_param("price_Sell",product.price_Now)
    dialogRef.componentInstance.set_param("stock",product.stock)
    dialogRef.componentInstance.set_param("supplier_id",product.fK_Person)
    this.personService.getPersonsById(product.fK_Person).subscribe({
      next:(person:Person)=>{dialogRef.componentInstance.set_param("supplier",person.name)},
    })
    
  }
}
