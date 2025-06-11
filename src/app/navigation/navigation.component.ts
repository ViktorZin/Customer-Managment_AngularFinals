import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule],
  template: `
  <!--
    <nav class="navigation">
      <li><a [routerLink]="['']">HOME</a></li>
      <li><a [routerLink]="['/customers']">CUSTOMERS</a></li>
      <li><a [routerLink]="['/customer', 0]">CUSTOMER</a></li>
      <li><a [routerLink]="['/opportunities']">OPPORTUNITIES</a></li>
      <li><a [routerLink]="['/reports']">REPORTS</a></li>
    </nav>
-->

<mat-sidenav-container class="sidenav-container">
  <mat-sidenav #drawer [mode]="isMobile ? 'over':'side'" [opened]="!isMobile">
    <mat-nav-list>
      <a mat-list-item [routerLink]="['']">HOME</a>
      <a mat-list-item [routerLink]="['/customers']">CUSTOMERS</a>
      <a mat-list-item [routerLink]="['/customer', 0]">CUSTOMER</a>
      <a mat-list-item [routerLink]="['/opportunities']">OPPORTUNITIES</a>
      <a mat-list-item [routerLink]="['/reports']">REPORTS</a>
    </mat-nav-list>
  </mat-sidenav>

  <mat-sidenav-content>
    <mat-toolbar color="primary">
      @if(isMobile) {
        <button mat-icon-button (click)="drawer.toggle()"> 
          <mat-icon>menu</mat-icon>
        </button>
      }


    </mat-toolbar>
  </mat-sidenav-content>
</mat-sidenav-container>



  `,
  styles: `

    .sidenav-container {
      height: auto;
    }

    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 2;
    }

    mat-sidenav {
      width: 250px;
    }

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
isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
  }

}
