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

  constructor(private http: HttpClient) {
    let customers: CustomerData[];
    this.getCustomerList().subscribe(data => {
      customers = data;
      this.calculateNextCustomerID(customers);
    });

  }

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

  getCustomerByID(id: number): Observable<CustomerData> {
    return this.http.get<CustomerData>(`${this.apiUrl}${id}`);
  }

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

  getCustomerList(): Observable<CustomerData[]> {
    return this.http.get<CustomerData[]>(this.apiUrl);
  }


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
