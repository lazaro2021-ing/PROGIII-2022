import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PersonsService } from 'src/app/services/person.services';
import { AddClientComponent } from '../add-client/add-client.component';
import { ClientComponent } from '../client/client.component';

@Component({
  selector: 'app-find-client',
  templateUrl: './find-client.component.html',
  styleUrls: ['./find-client.component.css']
})
export class FindClientComponent implements OnInit {
  name!:string;
  numero!:string;
  type:string="DNI";

  find_options = new FormGroup({
    name: new FormControl(null),
    numero: new FormControl(null),
    type:new FormControl('DNI'),
  });
  @Input() is_client:boolean=true;
  @Input() is_supplier:boolean=false;
  @Output() findClientClick = new EventEmitter();

  constructor(public dialog: MatDialog,private personService:PersonsService) { }

  ngOnInit(): void {
  }

  findClient():void{
    this.findClientClick.emit({name:this.find_options.value.name,
                              documentNumber:this.find_options.value.numero,
                              documentType:this.find_options.value.type})
  }

  typeDoumentSelect(event :any):void{
    this.type=event.value;
    this.findClientClick.emit({name:this.name,documentNumber:this.numero,documentType:this.type})
  }
  openDialog(){
    const dialogRef = this.dialog.open(AddClientComponent);
    dialogRef.componentInstance.is_client=this.is_client;
    dialogRef.componentInstance.is_supplier=this.is_supplier;
    
    dialogRef.afterClosed().subscribe(result => {
    
    });
  }
}
