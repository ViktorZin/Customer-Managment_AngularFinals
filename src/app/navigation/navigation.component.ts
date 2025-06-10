import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  template: `
    <nav class="navigation">
      <li><a [routerLink]="['']">HOME</a></li>
      <li><a [routerLink]="['/customers']">CUSTOMERS</a></li>
      <li><a [routerLink]="['/customer', 0]">CUSTOMER</a></li>
      <li><a [routerLink]="['/opportunities']">OPPORTUNITIES</a></li>
      <li><a [routerLink]="['/reports']">REPORTS</a></li>
    </nav>
  `,
  styles: `
    .navigation {
      display: flex;
      flex-direction: row;
      list-style: none;
      justify-content: space-between;
      background-color: grey;
      padding: 2% 10%;
    }
  `
})
export class NavigationComponent {

}
