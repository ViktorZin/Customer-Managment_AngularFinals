import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { CustomerData } from '../interfaces/customer-data';


@Component({
  selector: 'app-customers',
  imports: [NavigationComponent],
  template: `
      <app-navigation></app-navigation>
    <p>
      customers works!
    </p>

    <div class="responsive-table">
      <table>
        <tr>
          <th>Nachname</th>
          <th>Vorname</th>
          <th>E-Mail</th>
          <th>Telefonnummer</th>
          <th>Unternehmen</th>
        </tr>
        @for(item of items; track item.id) {
          <tr>
            <td>{{item.nachname}}</td>
            <td>{{item.vorname}}</td>
            <td>{{item.email}}</td>
            <td>{{item.telnum}}</td>
            <td>{{item.unternehmen}}</td>
          </tr>
        }
      </table>
    </div>
  `,
  styles: 
  `
    .responsive-table {
      overflow-x:auto;
    }

    .responsive-table table {
      width: 100%;
    }

    table, th, td {
      border-style: solid;
      border-color: black;
      border-collapse: collapse;
    }

    th, td {
      padding: 10px;
    }
  `
})
export class CustomersComponent {
  items: CustomerData[] = [
    { id: 0, nachname: 'Mustermann', vorname: 'Max', email: 'mustermann.max@viktorzin.com', telnum: '017631350213', unternehmen: 'ViktorZin Corporation'},
    { id: 0, nachname: 'Mustermann', vorname: 'Max', email: 'mustermann.max@viktorzin.com', telnum: '017631350213', unternehmen: 'ViktorZin Corporation'},
    { id: 0, nachname: 'Mustermann', vorname: 'Max', email: 'mustermann.max@viktorzin.com', telnum: '017631350213', unternehmen: 'ViktorZin Corporation'},
    { id: 0, nachname: 'Mustermann', vorname: 'Max', email: 'mustermann.max@viktorzin.com', telnum: '017631350213', unternehmen: 'ViktorZin Corporation'}
  ]
}
