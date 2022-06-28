import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TableProvince } from 'src/app/interfaces/ticket-simple.interface';
import {ThemePalette} from '@angular/material/core';

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

  @Input() province_data!:TableProvince[];

  provincias = [
    { name: 'Jujuy', lat: [23, 1], lng: [65, 25], value: 0 ,label:""},
    { name: 'Salta', lat: [24, 48], lng: [65, 25], value: 0 ,label:""},
    { name: 'Formosa', lat: [26, 11], lng: [58, 18], value: 0 ,label:""},
    { name: 'Chaco', lat: [26, 25], lng: [60, 25], value: 0 ,label:""},
    { name: 'Catamarca', lat: [28, 29], lng: [65, 47], value: 0 ,label:""},
    { name: 'Tucumán', lat: [26, 51], lng: [65, 12], value: 0 ,label:""},
    { name: 'Santiago del Estero', lat: [27, 45], lng: [63, 16], label: "" },
    { name: 'Corrientes', lat: [28, 27], lng: [57, 49], value: 0 ,label:""},
    { name: 'Misiones', lat: [27, 19], lng: [54, 53], value: 0 ,label:""},
    { name: 'La Rioja', lat: [29, 24], lng: [66, 50], value: 0 ,label:""},
    { name: 'Santa Fe', lat: [31, 42], lng: [60, 46], value: 0 ,label:""},
    { name: 'San Juan', lat: [31, 31], lng: [68, 33], value: 0 ,label:""},
    { name: 'Córdoba', lat: [31, 21], lng: [64, 5], value: 0 ,label:""},
    { name: 'Entre Ríos', lat: [31, 22], lng: [58, 9], value: 0 ,label:""},
    { name: 'Mendoza', lat: [34, 51], lng: [68, 51], value: 0 ,label:""},
    { name: 'San Luis', lat: [33, 17], lng: [66, 22], value: 0 ,label:""},
    { name: 'La Pampa', lat: [37, 39], lng: [65, 17], value: 0 ,label:""},
    { name: 'Buenos Aires', lat: [36, 28], lng: [60, 28], value: 0 ,label:""},
    { name: 'Neuquén', lat: [38, 55], lng: [70, 5], value: 0 ,label:""},
    { name: 'Río Negro', lat: [40, 49], lng: [67, 0], value: 0 ,label:""},
    { name: 'Chubut', lat: [44, 1], lng: [68, 28], value: 0 ,label:""},
    { name: 'Santa Cruz', lat: [48, 37], lng: [69, 14], value: 0 ,label:""},
    { name: 'Tierra del Fuego', lat: [54, 48], lng: [68, 17], value: 0 ,label:""},
  ];
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
