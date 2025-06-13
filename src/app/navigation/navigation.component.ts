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

<!-- Angular Material Routing Navigation, with a horizontal Nav for Desktop, and a burger menu for Mobile
The display is controlled by CSS, and the Window Width-->
<mat-sidenav-container class="sidenav-container">
  <mat-sidenav #drawer mode="over" class="sidenav" [opened]="false">
    <!-- Mobile Menu-->
    <mat-nav-list>
      <a mat-list-item [routerLink]="['']" (click)="drawer.close()">HOME</a>
      <a mat-list-item [routerLink]="['/customers']" (click)="drawer.close()">CUSTOMERS</a>
      <a mat-list-item [routerLink]="['/customer', -1]" (click)="drawer.close()">CUSTOMER</a>
      <a mat-list-item [routerLink]="['/opportunities']" (click)="drawer.close()">OPPORTUNITIES</a>
      <a mat-list-item [routerLink]="['/reports']" (click)="drawer.close()">REPORTS</a>
    </mat-nav-list>
  </mat-sidenav>
<!-- hamburger button-->
  <mat-sidenav-content>
    <mat-toolbar color="primary">
      @if(isMobile) {
        <button mat-icon-button (click)="drawer.toggle()" class="mobile-toggle"> 
          <mat-icon>menu</mat-icon>
        </button>
      }
      
      <!-- basic desktop menu-->
      <nav class="desktop-menu">
        <li><a [routerLink]="['']">HOME</a></li>
        <li><a [routerLink]="['/customers']">CUSTOMERS</a></li>
        <li><a [routerLink]="['/customer', -1]">CUSTOMER</a></li>
        <li><a [routerLink]="['/opportunities']">OPPORTUNITIES</a></li>
        <li><a [routerLink]="['/reports']">REPORTS</a></li>
      </nav>
    </mat-toolbar>
  </mat-sidenav-content>
</mat-sidenav-container>
    


  `,
  styles: `

    .sidenav-container {

    }

    .sidenav {
      position: fixed;
      height: 100vh;
      width: 300px;
      z-index: 1000;
    }

    .desktop-menu {
      display: none;
    }

    .mobile-toggle {
      display: block;
    }

    /*the mobile/Desktop switch is based on the width variable*/ 
    @media(min-width: 768px) {
      .sidenav-container {
      height: auto;
      width: 100%;
    }


      .desktop-menu {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        list-style: none;
        gap: 10px;
        
      }

      .desktop-menu a {
        text-decoration: none;
        color: white;
      }

      .mobile-toggle {
        display: none;
      }
    }
  `
})
export class NavigationComponent {
isMobile: boolean = true;

  

}
