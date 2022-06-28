import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Person } from 'src/app/interfaces/person.interface';
import { PersonsService } from 'src/app/services/person.services';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients!: Person[];
  protected all_clients!: Person[];
  @Input() father:string='window';
  @Input() is_client:boolean=true;
  @Input() is_supplier:boolean=false;
  @Input() crud:boolean=true;
  constructor(private clientService:PersonsService) { }

  ngOnInit(): void {
    this.clientService.getPersonByType(this.is_client).pipe(
      tap((clients: Person[]) => {
        this.clients = clients;
        this.all_clients = this.clients;
      })
    )
    .subscribe();
  }

  findClient(event:any):void{
    let client_filtrado!: Person[];
    client_filtrado=this.all_clients
    if (event.name) {
      client_filtrado = this.all_clients.filter(
        (fil) => fil.name.slice(0, event.name.length).toLowerCase() == event.name.toLowerCase()
      );
      
    }
   
    if (event.documentNumber ) {
      client_filtrado = this.all_clients.filter(
        (fil) => {return (fil.document_number.slice(0, event.documentNumber.length) == event.documentNumber && fil.document_type.slice(0,event.documentType.length)==event.documentType)}
      );
      
    }
    this.clients=client_filtrado;
  }

}
