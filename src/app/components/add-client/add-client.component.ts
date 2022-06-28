import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { City, Province, State } from 'src/app/interfaces/geo.interface';
import { Address, Person } from 'src/app/interfaces/person.interface';
import { AddressService } from 'src/app/services/address.service';
import { GeoService } from 'src/app/services/geo.service';
import { PersonsService } from 'src/app/services/person.services';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {
  formClient!: FormGroup;
  address: Address = {
    street: '',
    fK_City: 0,
    number: 0,
    floor: '',
    apartment: '',
    id: 0,
  };

  document_type_list = [
    { id: 1, type: 'DNI' },
    { id: 2, type: 'LC' },
    { id: 3, type: 'LE' },
    { id: 4, type: 'CI' },
  ];
  @Input() is_client: boolean = true;
  @Input() is_supplier: boolean = false;
  @Input() is_update: boolean = false;
  provinces!: Province[];
  states!: State[];
  cities!: City[];
  constructor(
    private geoServices: GeoService,
    private addressService: AddressService,
    private personService: PersonsService,
    public _snackBar: MatSnackBar
  ) {
    this.formClient = new FormGroup({
      id_person: new FormControl('', []),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(10),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      document_number: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$'),
      ]),
      document_type: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[0-9]*$'),
      ]),
      street: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.pattern('^[a-zA-Z0-9 ]*$'),
      ]),
      number: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      floor: new FormControl('', [
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(5),
      ]),
      apartment: new FormControl('', [Validators.maxLength(5)]),
      province: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      is_Client: new FormControl('', []),
      is_Supplier: new FormControl('', []),
      fk_address: new FormControl('', []),
      id_address: new FormControl('', []),
      fK_City: new FormControl('', []),
      code: new FormControl('', []),
    });
  }

  ngOnInit(): void {
    this.geoServices.getProvinces().subscribe((province: Province[]) => {
      this.provinces = province;
    });

    this.formClient.get('is_Client')?.setValue(true);
    this.formClient.get('is_Supplier')?.setValue(false);
  }

  get email() {
    return this.formClient.get('email');
  }
  get name() {
    return this.formClient.get('name');
  }
  get document_number() {
    return this.formClient.get('document_number');
  }
  get telephone() {
    return this.formClient.get('telephone');
  }
  get street() {
    return this.formClient.get('street');
  }
  get number() {
    return this.formClient.get('number');
  }
  get floor() {
    return this.formClient.get('floor');
  }
  get apartment() {
    return this.formClient.get('apartment');
  }

  changeProvince(id_province: number) {
    this.geoServices.getStates(id_province).subscribe((state: State[]) => {
      this.states = state;
    });
  }

  changeState(id_state: number) {
    this.geoServices.getCitys(id_state).subscribe((cities: City[]) => {
      this.cities = cities;
    });
  }

  changeCity(id_city: number) {
    this.address.fK_City = id_city;
  }

  typeDoumentSelect($event: any) {
    this.formClient.get('document_type')?.setValue($event.value);
  }

  save() {
    console.log(this.formClient)
    if (!this.is_update) {
      this.saveClient();
    }
    if (this.is_update) {
      this.updateClient();
    }
  }

  updateClient() {
    if (this.is_client == false) {
      this.formClient.get('is_Client')?.setValue(false);
      this.formClient.get('is_Supplier')?.setValue(true);
    }
    this.address.id=this.formClient.value.id_address;
    this.address.fK_City=this.formClient.value.fK_City;
    this.address.street = this.formClient.value.street;
    this.address.number = this.formClient.value.number;
    this.address.floor = this.formClient.value.floor;
    this.address.apartment = this.formClient.value.apartment;

    this.addressService.updateAddress(this.address).subscribe({
      next: (address: Address) => {
        
        this.personService.updatePerson(this.formClient).subscribe({
          next: (result: Person) => {
            console.log(result);
          },
          error: (e) => {
            this.snackBar('Error al actualizar el cliente.');
          },
          complete: () => {
            if (this.is_client == true) {
              this.snackBar('Cliente actualizado exitosamente.');
            }
            if (this.is_supplier == true) {
              this.snackBar('Proveedor actualizado exitosamente.');
            }
          },
        });
      },
      error: (e) => {
        if (this.is_client == true) {
          this.snackBar('Error al actualizar el cliente.');
        }
        if (this.is_supplier == true) {
          this.snackBar('Error al actualizar el proveedor.');
        }
      },
    });
  }

  saveClient() {
    if (this.is_client == false) {
      this.formClient.get('is_Client')?.setValue(false);
      this.formClient.get('is_Supplier')?.setValue(true);
    }

    this.address.street = this.formClient.value.street;
    this.address.number = this.formClient.value.number;
    this.address.floor = this.formClient.value.floor;
    this.address.apartment = this.formClient.value.apartment;

    this.addressService.postAddress(this.address).subscribe({
      next: (address: any) => {
        console.log('address',address)
        this.formClient.get('fk_address')?.setValue(address.value.id);
        console.log('address',address.value.id)
        this.personService.postPerson(this.formClient).subscribe({
          next: (result: Person) => {
            console.log(result);
          },
          error: (e) => {
            console.log(e);
            this.snackBar('Error al agregar el cliente.');
          },
          complete: () => {
            if (this.is_client == true) {
              this.snackBar('Cliente agregado exitosamente.');
            }
            if (this.is_supplier == true) {
              this.snackBar('Proveedor agregado exitosamente.');
            }
          },
        });
      },
      error: (e) => {
        if (this.is_client == true) {
          this.snackBar('Error al agregar la direccion del cliente.');
        }
        if (this.is_supplier == true) {
          this.snackBar('Error al agregar la direccion del proveedor.');
        }
      },
    });
  }

  snackBar(msg: string): void {
    this._snackBar.open(msg, 'close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
    });
    setTimeout(() => {
      this._snackBar.ngOnDestroy();
    }, 3000);
  }

  set_param(key: string, value: any) {
    if (key == 'province') {
      this.changeProvince(value);
    }

    if (key == 'state') {
      this.changeState(value);
    }
    this.formClient.get(key)?.setValue(value);
  }
}
