import { Injectable } from '@angular/core';
import { CustomerData } from './interfaces/customer-data';
import { Observable, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  private apiUrl = 'http://localhost:3000/customers/';
  nextCustomerID: number = 0;

  //initialized the Service,, gathers data
  constructor(private http: HttpClient) {
    let customers: CustomerData[];
    this.getCustomerList().subscribe(data => {
      customers = data;
      this.calculateNextCustomerID(customers);
    });

  }

  //this function calculates the next customerID, which is neccessary for creating new customers.
  calculateNextCustomerID(customers: CustomerData[]) {
    let highestID: number = 0;
    for(let i = 0; i < customers.length; i++) {
      if(customers[i].id! > highestID){
        highestID = customers[i].id;
      }
    }
    highestID++;
    this.nextCustomerID = highestID;
  }

  //this function creates a new customer based on the given data, and adds them to the database
  //C in CRUD
  createCustomer({lastName, firstName, mail, tel, job} : {lastName: string; firstName: string; mail: string; tel?: string; job?: string}) {
    let customer: CustomerData = {
      id: this.nextCustomerID,
      nachname: lastName,
      vorname: firstName,
      email: mail,
      telnum: tel !== undefined ? tel : '',
      unternehmen: job !== undefined ? job : ''
    }
    console.log("I made a custoner. nachname: " + customer.nachname + " | vorname: " + customer.vorname + " und der sollte jetzt eig. in der Database landen....");
    this.nextCustomerID++;
    return this.http.post<CustomerData>(this.apiUrl, {
      ...customer,
      id: customer.id.toString()
    });    
  }

  //this function returns one customer given a search ID from the database 
  //R of CRUD
  getCustomerByID(id: number): Observable<CustomerData> {
    return this.http.get<CustomerData>(`${this.apiUrl}${id}`);
  }

  //this function should check if a customer exists, based on ID. currently not in use anymore.
  doesCustomerExistByID(id: number) {
    return this.getCustomerByID(id).subscribe(data => {
      if(data === null) {
        return false;
      }
      else {
        return true;
      }
    })
    return false;
  }

  //returns the full list of customers from the Database.
  //R of CRUD
  getCustomerList(): Observable<CustomerData[]> {
    return this.http.get<CustomerData[]>(this.apiUrl);
  }

//updates a customer in the database with new Values
//U of CRUD
updateCustomerByID(
  id: number,
  { lastName, firstName, mail, tel, job }: 
  { lastName: string; firstName: string; mail: string; tel?: string; job?: string }
): Observable<CustomerData> {
  return this.getCustomerByID(id).pipe(
    switchMap(customer => {
      if (!customer) {
        return throwError(() => new Error('Customer not found'));
      }
      customer.nachname = lastName;
      customer.vorname = firstName;
      customer.email = mail;
      customer.telnum = tel ?? '';
      customer.unternehmen = job ?? '';

      return this.http.put<CustomerData>(`${this.apiUrl}${customer.id}`, customer);
    })
  );
}



  //Deletes a Customer from the Database
  //D of CRUD
  deleteCustomerByID(id: number) {
    let customer: CustomerData;
    this.getCustomerByID(id).subscribe(data => {
      customer = data;
      if(customer){
        this.http.delete<void>(`${this.apiUrl}${customer.id}`).subscribe(data => {});
      }
    })
  }

}
