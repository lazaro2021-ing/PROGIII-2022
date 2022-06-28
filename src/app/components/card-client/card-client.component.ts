import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address, GeoData, Person } from 'src/app/interfaces/person.interface';
import { AddressService } from 'src/app/services/address.service';
import { PersonsService } from 'src/app/services/person.services';
import { ProductsService } from 'src/app/services/products.services';
import { TicketService } from 'src/app/services/ticket.service';
import { AddClientComponent } from '../add-client/add-client.component';

@Component({
  selector: 'app-card-client',
  templateUrl: './card-client.component.html',
  styleUrls: ['./card-client.component.css']
})
export class CardClientComponent implements OnInit {

  @Input() client!:Person;
  @Input() father!:string;
  address!:Address;
  geoData!:GeoData;
  @Input() is_client:boolean=false;
  @Input() is_supplier:boolean=false;
  @Input() crud:boolean=false;

  panelOpenState: boolean = false;
  constructor(private addressServive:AddressService,
              private ticketService:TicketService,
              private personService:PersonsService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
              ) { }

  ngOnInit(): void {
  }

  clientConfirm():void{
    this.ticketService.setClientToTicket(this.client);
    this.snackBar('Cliente agregado con exito.');
  }

  supplierConfirm():void{
    this.personService.setSupplierToProduct(this.client);
    this.snackBar('Proveedor agregado con exito.');
  }

  openPanelChange(){
    this.panelOpenState=!this.panelOpenState;
    if(this.panelOpenState){
      this.addressServive.getAddress(this.client.fK_Address).subscribe((result:Address)=>{
        this.address=result
        this.addressServive.getGeoData(result.fK_City).subscribe((result:GeoData)=>{this.geoData=result;});
      });
      
    }
  }

  editClient(person:Person){
    const dialogRef = this.dialog.open(AddClientComponent);
    dialogRef.componentInstance.is_update=true
    dialogRef.componentInstance.is_client=this.is_client
    dialogRef.componentInstance.is_supplier=this.is_supplier

    this.addressServive.getAddress(person.fK_Address).subscribe({
      next:(result:Address)=>{this.address=result},
      complete:()=>{
        console.log(this.address)
        dialogRef.componentInstance.set_param("id_address",this.address.id);
        dialogRef.componentInstance.set_param("fK_City",this.address.fK_City);
        dialogRef.componentInstance.set_param("street",this.address.street);
        dialogRef.componentInstance.set_param("number",this.address.number  );
        dialogRef.componentInstance.set_param("floor",this.address.floor);
        dialogRef.componentInstance.set_param("apartment",this.address.apartment);
        this.addressServive.getGeoData(this.address.fK_City).subscribe({
          next:(result:GeoData)=>{this.geoData=result;},
          complete:()=>{
            dialogRef.componentInstance.set_param("province",this.geoData.province.id);
            dialogRef.componentInstance.set_param("state",this.geoData.state.id);
            dialogRef.componentInstance.set_param("city",this.geoData.city.id);
          }
        });
      }
    
    });
    dialogRef.componentInstance.set_param("id_person",person.id)
    dialogRef.componentInstance.set_param("name",person.name)
    dialogRef.componentInstance.set_param("code",person.code)

    dialogRef.componentInstance.set_param("document_number",person.document_number.trim())
    dialogRef.componentInstance.set_param("document_type",person.document_type.trim())
    dialogRef.componentInstance.set_param("telephone",person.telephone)
    dialogRef.componentInstance.set_param("email",person.email)
    dialogRef.componentInstance.set_param("fk_address",person.fK_Address)
    
    
   
   
    /*
    this.personService.getPersonsById(product.fK_Person).subscribe({
      next:(person:Person)=>{dialogRef.componentInstance.set_param("supplier",person.name)},
    })
    */
    
  }

  snackBar(msg:string): void {
    this._snackBar.open(msg, 'close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
    setTimeout(() => {
      this._snackBar.ngOnDestroy();
    }, 2000);
  }
}
