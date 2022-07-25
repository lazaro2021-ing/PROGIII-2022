import { coerceStringArray } from '@angular/cdk/coercion';
import { ElementRef, HostListener, OnChanges, ViewChild } from '@angular/core';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FindProduct } from 'src/app/interfaces/product.interface';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-find-product',
  templateUrl: './find-product.component.html',
  styleUrls: ['./find-product.component.css'],
})
export class FindProductComponent implements OnInit {

  find_options = new FormGroup({
    name: new FormControl(null),
    code: new FormControl(null),
    type:new FormControl(null),
  });
  @Output() findProductClick = new EventEmitter();
  @Input() typesProduct: any = {};
  @Input() crud:boolean=true;
  constructor(public dialog: MatDialog) {
    
   }
 


  ngOnInit(): void {
  
  }

 

 
  typeProductSelect(event: any) {
    
    this.findProductClick.emit(this.find_options.value);
  }

  findProduct(): void {
    
    this.findProductClick.emit(this.find_options.value);
  }

  openDialogAddProduct(){
    const dialogRef = this.dialog.open(AddProductComponent);
   
    dialogRef.afterClosed().subscribe(result => {
      window.location.reload()

    });
  }
}
