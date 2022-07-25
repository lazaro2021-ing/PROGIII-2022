import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Person } from 'src/app/interfaces/person.interface';
import { Product, ProductType, ProductUnit } from 'src/app/interfaces/product.interface';
import { PersonsService } from 'src/app/services/person.services';
import { ProductsService } from 'src/app/services/products.services';
import { TypeProductsService } from 'src/app/services/types-product.service';
import { UnitsProductsService } from 'src/app/services/unit-product.services';
import { ClientComponent } from '../client/client.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  typesProduct!: any;
  unitsProduct!: any;
  formProduct!: FormGroup;
  @Input() is_update:boolean=false;
  supplier$ = this.personService.supplierAddProduct$;

  constructor(
    private personService: PersonsService,
    private typeProductService: TypeProductsService,
    private unitsProductService: UnitsProductsService,
    private productService:ProductsService,
    public dialog: MatDialog,
    public _snackBar: MatSnackBar,
    private router: Router
  ) {

    this.typesProduct = this.typeProductService.getTypesProducts();
    this.unitsProduct = this.unitsProductService.getUnitsProducts();

    this.formProduct = new FormGroup({
      id: new FormControl('', []),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern('^[A-Za-z0-9][A-Za-z0-9 ]\*[A-Za-z0-9]\*$'),
      ]),
      type: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      detail: new FormControl('', [
        Validators.maxLength(150),
        Validators.minLength(10),
      ]),
      price_Buy: new FormControl('', [
        Validators.required,
        Validators.pattern('^[+-]?[0-9]+\.?[0-9]*'),
      ]),
      percent: new FormControl('', []),
      price_Sell: new FormControl('', []),
      stock: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      supplier: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      supplier_id: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
    
  }

  ngOnInit(): void {
   
    this.formProduct.get('supplier')?.disable();
    
    this.supplier$.subscribe((supplier:Person)=>{
      if(supplier){
        this.supplier?.setValue(supplier.name);
        this.supplier_id?.setValue(supplier.id);
      }
    })
  }

  saveProduct() {
    if(this.formProduct.value.price_Sell<=this.formProduct.value.price_Buy){
      this.snackBar("Error el precio de venta no puede ser menor o igual al de compra.");
      return
    }
    if(this.is_update){
      this.productService.updateProduct(this.formProduct).subscribe({
        next:(result:Product)=>{console.log(result)},
        error:(e)=>{this.snackBar("Error al actualizar el producto.");},
        complete:()=>{this.snackBar("Producto actualizado con exito.");}
      })
    }else{
      this.productService.postProduct(this.formProduct).subscribe({
        next:(result:Product)=>{console.log(result)},
        error:(e)=>{this.snackBar("Error al agregar el producto.");},
        complete:()=>{
          this.snackBar("Producto agregado con exito.");
        }
      })
    }
    
  }


  priceBuyChange($event: any) {
    this.price_Sell?.setValue(
      ((1 + this.percent?.value / 100) * this.price_Buy?.value).toFixed(2)
    );
  }
  percentSelect($event: any) {
    this.price_Sell?.setValue(
      ((1 + $event.value / 100) * this.price_Buy?.value).toFixed(2)
    );
  }

  openSuppliers() {
    const dialogRef = this.dialog.open(ClientComponent);
    dialogRef.componentInstance.is_supplier = true;
    dialogRef.componentInstance.is_client=false;
    dialogRef.componentInstance.father = 'dialog';
    
  }
  set_param(key:string,value:any) {
      this.formProduct.get(key)?.setValue(value);
  }
  get name() {
    return this.formProduct.get('name');
  }
  
  get type() {
    return this.formProduct.get('type');
  }
  get unit() {
    return this.formProduct.get('unit');
  }
  get detail() {
    return this.formProduct.get('detail');
  }
  get price_Buy() {
    return this.formProduct.get('price_Buy');
  }
  get percent() {
    return this.formProduct.get('percent');
  }
  get price_Sell() {
    return this.formProduct.get('price_Sell');
  }
  get stock() {
    return this.formProduct.get('stock');
  }
  get supplier() {
    return this.formProduct.get('supplier');
  }
  get supplier_id() {
    return this.formProduct.get('supplier_id');
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

  clearForm(){
    this.formProduct.reset({})
  
  }
}
