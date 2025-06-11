import { Injectable } from '@angular/core';
import { CustomerData } from './interfaces/customer-data';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  customers: CustomerData[] = [];

  //CRUD -> Create, Read, Update, Delete

  createCustomer(lastName: string, firstName: string, mail: string, tel: string | null, job: string | null){
    let customer: CustomerData = {
      id: 0,
      nachname: lastName,
      vorname: firstName,
      email: mail,
      telnum: tel !== null ? tel : '',
      unternehmen: job !== null ? job : ''
    }
    this.customers.push(customer);
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



  getCustomerList() {
    return this.customers;
  }

  updateCustomerByID(id: number, lastName: string, firstName: string, mail: string, tel: string | null, job: string | null) {
    let customer = this.getCustomerByID(id);
    if(customer) {
        customer.nachname = lastName;
        customer.vorname = firstName;
        customer.email = mail;
        customer.telnum = tel !== null ? tel : '';
        customer.unternehmen = job !== null ? job : '';
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

  constructor() { }
}
