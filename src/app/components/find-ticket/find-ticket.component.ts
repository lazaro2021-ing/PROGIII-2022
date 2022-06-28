import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-find-ticket',
  templateUrl: './find-ticket.component.html',
  styleUrls: ['./find-ticket.component.css']
})
export class FindTicketComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required]),
    document_number:new FormControl('', [Validators.required]),
  });
  @Output() findTicketClick = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  findTickets(){
    this.findTicketClick.emit(this.range)
  }
}
