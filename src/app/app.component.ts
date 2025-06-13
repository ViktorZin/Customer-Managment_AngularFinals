import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  //templateUrl: './app.component.html',
  template: `
    <h1>Customer-Management-App</h1>
    <router-outlet />

  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'customer-management-app';
}
