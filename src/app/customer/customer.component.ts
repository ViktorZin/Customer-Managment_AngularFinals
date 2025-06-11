import { Component, inject } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import {FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerData } from '../interfaces/customer-data';
import { CustomerService } from '../customer.service';


@Component({
  selector: 'app-customer',
  imports: [NavigationComponent, ReactiveFormsModule],
  template: `
    <app-navigation></app-navigation>
    <p>
      customer works!
    </p>

    <div>
    <form [formGroup]="customerForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="first-name">First Name: </label>
        <input id="first-name" type="text" formControlName="firstName" />
      </div>
      <div>
        <label for="last-name">Last Name: </label>
        <input id="last-name" type="text" formControlName="lastName" />
      </div>
      <div>
        <label for="email">E-Mail: </label>
        <input id="email" type="email" formControlName="email" ngModel email/>
      </div>
      <div>
        <label for="telnum">Telephone Number: </label>
        <input id="telnum" type="text" formControlName="telnum" />
      </div>
      <div>
        <label for="company">Company: </label>
        <input id="company" type="text" formControlName="unternehmen" />
      </div>
      <div>
        <button type="submit" [disabled]="!customerForm.valid">Submit</button>
      </div>
    </form>
    </div>

    <!--
    <div>
    <p> {{customerForm.controls.firstName.value}} 
      {{customerForm.controls.lastName.value}} 
      {{ customerForm.controls.email.value}}
      {{customerForm.controls.telnum.value}}
      {{customerForm.controls.unternehmen.value}}
    </p>
    </div>
-->
  `,
  styles: 
  `
  form {
    display: flex;
    flex-direction: column;
  }
  `
})
export class CustomerComponent {
  customerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    telnum: new FormControl(''),
    unternehmen: new FormControl('')    
  })

  customerService = inject(CustomerService);

  onSubmit() {
    console.log("Submitting Customer to Database");
    /*
    let customer: CustomerData = 
    {
      id: 0,
      vorname: this.customerForm.controls.firstName.value!,
      nachname: this.customerForm.controls.lastName.value!,
      email: this.customerForm.controls.email.value!,
      telnum: this.customerForm.controls.telnum.value!,
      unternehmen: this.customerForm.controls.unternehmen.value!
    } 
     */
    if(this.customerForm.status) {
          this.customerService.createCustomer(
            this.customerForm.controls.lastName.value!, 
            this.customerForm.controls.firstName.value!, 
            this.customerForm.controls.email.value!,
            this.customerForm.controls.telnum.value, 
            this.customerForm.controls.unternehmen.value
          )
          console.log("Creating a new Customer");
    }

  }
}
