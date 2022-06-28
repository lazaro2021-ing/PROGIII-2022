import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})

export class SellComponent implements OnInit {
  crud:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
}
