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
import { TelNumFormatDirective } from '../tel-num-format.directive';


@Component({
  selector: 'app-customer',
  imports: [TelNumFormatDirective, NavigationComponent, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, AvatarCardComponent],
  template: `
    <app-navigation></app-navigation>
    <div class="container">
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
          <input matInput id="telnum" type="text" appTelNumFormat formControlName="telnum" />
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label for="company">Company: </mat-label>
          <input matInput id="company" type="text" formControlName="unternehmen" />
        </mat-form-field>
          <div>
            <button mat-flat-button [disabled]="!customerForm.valid" color="primary" type="submit" >Submit</button>
          </div>
      </form>
      </div>
      <div>
      <app-avatar-card>
        @if(givenCustomer === null) {
          <h1>C A</h1>
        }
        @else {
          <h1>{{givenCustomer.vorname[0]}} {{givenCustomer.nachname[0]}}</h1>
        }

      </app-avatar-card>
      </div>

    </div>
  `,
  styles: 
  `
  form {
    display: flex;
    flex-direction: column;
    min-width: 300px;
  }

  .container {

    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    gap: 25px;
    
  }

  .container, * {
    min-width: 30%;
  }
  `
})



export class CustomerComponent {

  constructor(private route: ActivatedRoute, private router: Router) {}

  givenCustomer: CustomerData | null = null;
  customerService = inject(CustomerService);
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      if(id) {

        if(+id !== -1) {
          this.customerService.getCustomerByID(+id).subscribe(data => {
            this.givenCustomer = data;
            this.displayCustomerData();
          });
   
        }  
      }
      else {

      }
    })
  }
  
  customerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telnum: new FormControl(''),
    unternehmen: new FormControl('')    
  })

  displayCustomerData() {
    if(this.givenCustomer !== null) {
      this.customerForm.controls.firstName.setValue(this.givenCustomer.vorname);
      this.customerForm.controls.lastName.setValue(this.givenCustomer.nachname);
      this.customerForm.controls.email.setValue(this.givenCustomer.email);

      if(this.givenCustomer.telnum !== undefined) {
        this.customerForm.controls.telnum.setValue(this.givenCustomer.telnum);
      }
      if(this.givenCustomer.unternehmen !== undefined) {
        this.customerForm.controls.unternehmen.setValue(this.givenCustomer.unternehmen);
      }
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
        let customer: CustomerData;
       
          console.log("Editing an existing Customer");
          this.customerService.updateCustomerByID(this.givenCustomer.id, this.passCustomerData())
          .subscribe( {
            error: err => console.error('Update error: ', err)
          });
          this.router.navigate(['/customers']);
        
      }
      else {
        this.customerService.createCustomer(this.passCustomerData()).subscribe(customer => {});
        console.log("Creating a new Customer");
          this.router.navigate(['/customers']);
      }
    
    }




  }
}
