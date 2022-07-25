import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TableProvince } from 'src/app/interfaces/ticket-simple.interface';
import {ThemePalette} from '@angular/material/core';
import { setting } from 'src/app/setting_app';

@Component({
  selector: 'app-province-count-client',
  templateUrl: './province-count-client.component.html',
  styleUrls: ['./province-count-client.component.css']
})
export class ProvinceCountClientComponent implements OnInit {

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  factor_radio:number=1
  provincias=setting.provincias


  @Input() province_data!:TableProvince[];

  constructor() { }

  ngOnInit(): void {

    const max_value=this.province_data.reduce((acc, shot) => acc = acc > shot.count_P ? acc : shot.count_P, 0);
    this.province_data.forEach((elem,i)=>{
      let index=this.provincias.findIndex(x=>x.name==elem.province_Name)
      this.provincias[index].value=elem.count_P*200000/max_value
      this.provincias[index].label=this.provincias[index].name+":"+elem.count_P
      
    });
  }



}
