import { Component, inject } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { CustomerService } from '../customer.service';
import { CustomerData } from '../interfaces/customer-data';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-customers',
  imports: [NavigationComponent, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
      <app-navigation></app-navigation>

    <div>
      <button mat-flat-button color="primary" type="button" (click)="addNewCustomer()">Add Customer</button>
    </div>

    <mat-form-field appearance="fill">
      <mat-label for="table-search">Tabellensuche: </mat-label>
      <input matInput id="table-search" type="text" [(ngModel)]="inputValue" (ngModelChange)="setFilter()"/>
    </mat-form-field>


    <div class="responsive-table">
      <table>
        <tr>
          <th>Nachname</th>
          <th>Vorname</th>
          <th>E-Mail</th>
          <th>Telefonnummer</th>
          <th>Unternehmen</th>
          <th class="no-border"></th>
        </tr>
        @for(item of filteredItems; track item.id) {
          <tr>
            <td>{{item.nachname}}</td>
            <td>{{item.vorname}}</td>
            <td>{{item.email}}</td>
            <td>{{item.telnum}}</td>
            <td>{{item.unternehmen}}</td>
            <td class="no-border"><button mat-raised-button color="primary" type="button" (click)="onEdit(item.id)">Edit</button></td>
            <td class="no-border"><button mat-raised-button color="warn" type="button" (click)="onDelete(item.id)">Delete</button></td>
          </tr>
        }
      </table>
    </div>
  `,
  styles: 
  `
    body {
      //background-color: white;
    }


    .responsive-table {
      overflow-x:auto;
    }

    .responsive-table table {
      width: 100%;
    }

    th, td {
      border-style: solid;
      border-color: black;
      border-collapse: collapse;
    }

    th, td {
      padding: 10px;
    }

    .no-border {
      border-style: none;
      border-collapse: separate;
    }
  `
})
export class CustomersComponent {
  
  constructor(private router: Router, private dialog: MatDialog) {}

  customerService = inject(CustomerService);
  items = this.customerService.getCustomerList();
  inputValue: string = '';

  filteredItems: CustomerData[] = this.items;

  setFilter() {
    console.log("filtering");
    if(this.inputValue === '' || this.inputValue === undefined) {
      this.filteredItems = this.items;
    }
    else {
      this.filteredItems = [];
      for(let i = 0; i < this.items.length; i++) {
        if(this.checkFilterMatch(this.inputValue, [this.items[i].vorname, this.items[i].nachname, this.items[i].email, this.items[i].unternehmen ])) {
          this.filteredItems.push(this.items[i]);
        }
      }
    }
  }

  addNewCustomer() {
    this.router.navigate(['/customer', -1]);
  }
  onEdit(id: number) {
    this.router.navigate(['/customer', id]);
  }

  onDelete(id: number) {
    //this.customerService.deleteCustomerByID(id);
    let dialogRef = this.dialog.open(ConfirmDialogComponent); 
    
    dialogRef.afterClosed().subscribe(result => {
      if(result === true) {
        this.customerService.deleteCustomerByID(id);
      }
    });
  }

  checkFilterMatch(filter: string, data: string[]): boolean {
    for(let i = 0; i < data.length; i++) {
      if(data[i].includes(filter)){
        return true;
      }
    }
    
    return false;
  }
}
