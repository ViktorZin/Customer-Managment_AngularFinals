import { Injectable } from '@angular/core';
import { CustomerData } from './interfaces/customer-data';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  customers: CustomerData[] = [];
  nextCustomerID: number = 0;

  constructor() {
    //{lastName: "", firstName: "", mail: "", tel?: "", job?: "" }

    this.createCustomer({lastName: "Dobrovolskis", firstName: "Viktoras", mail: "viktorasd@gmx.de", tel: "017631350213"});
    this.createCustomer({lastName: "Wurst", firstName: "Hans", mail: "wurst.Hans@hotmail.com", job: "Würstchenbude"});
    this.createCustomer({lastName: "Punghorst", firstName: "Franziska", mail: "franziska-punghorst@web.de", tel: "01728778457", job: "Air Liquide" });
    this.createCustomer({lastName: "Zin", firstName: "Viktor", mail: "viktorzin@viktorzin.com", job: "Studio Beyond Abyss" });
    this.createCustomer({lastName: "Kromallek", firstName: "Dieter", mail: "d.kromallek@yahoo.com", job: "Malermeister Kromallek" });

    this.customers[0].id = 0;
    this.customers[1].id = 1;
    this.customers[2].id = 2;
    this.customers[3].id = 3;
    this.customers[4].id = 4;

    this.calculateNextCustomerID();
  }

  calculateNextCustomerID() {
    let highestID: number = 0;
    for(let i = 0; i < this.customers.length; i++) {
      if(this.customers[i].id! > highestID){
        highestID === this.customers[i].id;
      }
    }
    highestID++;
    this.nextCustomerID === highestID;
  }

  createCustomer({lastName, firstName, mail, tel, job} : {lastName: string; firstName: string; mail: string; tel?: string; job?: string}) {
    let customer: CustomerData = {
      id: this.nextCustomerID,
      nachname: lastName,
      vorname: firstName,
      email: mail,
      telnum: tel !== undefined ? tel : '',
      unternehmen: job !== undefined ? job : ''
    }
    this.customers.push(customer);
    this.nextCustomerID++;
  }


  getCustomerByID(id: number) {
    let customer = this.customers.find(customer => customer.id === id);
    if(customer != null) {
      return customer;
    }
    else {
      return null;
    }
  }

  doesCustomerExistByID(id: number) {
    if(this.customers.find(customer => customer.id === id)){
      return true;
    }
    return false;
  }

  getCustomerList() {
    return this.customers;
  }

  updateCustomerByID(id: number, {lastName, firstName, mail, tel, job} : {lastName: string, firstName: string, mail: string, tel?: string, job?: string}) {
    let customer = this.getCustomerByID(id);
    if(customer) {
        customer.nachname = lastName;
        customer.vorname = firstName;
        customer.email = mail;
        customer.telnum = tel !== undefined ? tel : '';
        customer.unternehmen = job !== undefined ? job : '';
    }
  }

  deleteCustomerByID(id: number) {
    let customer = this.getCustomerByID(id);
    if(customer){
      let index = this.customers.indexOf(customer);
      if(index > -1){
        this.customers.splice(index, 1);
      }
    }
  }

}
