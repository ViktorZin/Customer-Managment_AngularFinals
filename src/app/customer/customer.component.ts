import { Component, inject } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import {FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerData } from '../interfaces/customer-data';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AvatarCardComponent } from '../avatar-card/avatar-card.component';

@Component({
  selector: 'app-customer',
  imports: [NavigationComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, AvatarCardComponent],
  template: `
    <app-navigation></app-navigation>
    <p>
      customer works!
    </p>

    <div>
    <app-avatar-card>
      <h3>Customer Avatar</h3>
    </app-avatar-card>
    </div>

    <div>
    <form [formGroup]="customerForm" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill">
        <mat-label for="first-name">First Name: </mat-label>
        <input matInput id="first-name" type="text" formControlName="firstName" required/>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label for="last-name">Last Name: </mat-label>
        <input matInput id="last-name" type="text" formControlName="lastName" required/>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label for="email">E-Mail: </mat-label>
        <input matInput id="email" type="email" formControlName="email" required/>
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label for="telnum">Telephone Number: </mat-label>
        <input matInput id="telnum" type="text" formControlName="telnum" />
      </mat-form-field>
      <mat-form-field appearance="fill">
        <mat-label for="company">Company: </mat-label>
        <input matInput id="company" type="text" formControlName="unternehmen" />
      </mat-form-field>
        <div>
          <button mat-raised-button color="primary" type="submit" [disabled]="!customerForm.valid">Submit</button>
        </div>
    </form>
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

  constructor(private route: ActivatedRoute, private router: Router) {}

  givenCustomer!: CustomerData;
  customerService = inject(CustomerService);
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if(id) {
        this.givenCustomer = this.customerService.getCustomerByID(+id)!;
        this.displayCustomerData();
      }
    })
  }
  
  customerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    telnum: new FormControl(''),
    unternehmen: new FormControl('')    
  })

  displayCustomerData() {
    this.customerForm.controls.firstName.setValue(this.givenCustomer.vorname);
    this.customerForm.controls.lastName.setValue(this.givenCustomer.nachname);
    this.customerForm.controls.email.setValue(this.givenCustomer.email);

    console.log("givenCustomer mail: " + this.givenCustomer.email);

    if(this.givenCustomer.telnum !== undefined) {
      this.customerForm.controls.telnum.setValue(this.givenCustomer.telnum);
    }
    if(this.givenCustomer.unternehmen !== undefined) {
      this.customerForm.controls.unternehmen.setValue(this.givenCustomer.unternehmen);
    }
  }

  passCustomerData() {
    return {
            lastName: this.customerForm.controls.lastName.value!, 
            firstName: this.customerForm.controls.firstName.value!,
            mail: this.customerForm.controls.email.value!,
            tel: this.customerForm.controls.telnum.value !== undefined ? this.customerForm.controls.telnum.value! : '',
            job: this.customerForm.controls.unternehmen.value !== undefined ? this.customerForm.controls.unternehmen.value! : ''
          }
  }
  

  onSubmit() {
    if(this.customerForm.status) {
      if(this.givenCustomer !== null) {
        if(this.customerService.doesCustomerExistByID(this.givenCustomer.id)){
          console.log("Editing an existing Customer");
          this.customerService.updateCustomerByID(this.givenCustomer.id, this.passCustomerData());
        }
      }
      else {
        this.customerService.createCustomer(this.passCustomerData());
        console.log("Creating a new Customer");
      }
      this.router.navigate(['/customers']);
    }
  }
}
