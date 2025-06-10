import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import {FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  imports: [NavigationComponent, ReactiveFormsModule],
  template: `
    <app-navigation></app-navigation>
    <p>
      customer works!
    </p>

    <div>
    <form [formGroup]="customerForm">
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
        <input id="email" type="text" formControlName="email" />
      </div>
      <div>
        <label for="telnum">Telephone Number: </label>
        <input id="telnum" type="text" formControlName="telnum" />
      </div>
      <div>
        <label for="company">Company: </label>
        <input id="company" type="text" formControlName="unternehmen" />
      </div>
    </form>
    </div>

    <div>
    <p> {{customerForm.controls.firstName.value}} 
      {{customerForm.controls.lastName.value}} 
      {{ customerForm.controls.email.value}}
      {{customerForm.controls.telnum.value}}
      {{customerForm.controls.unternehmen.value}}
    </p>
    </div>

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
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    telnum: new FormControl(''),
    unternehmen: new FormControl('')    
  })
}
