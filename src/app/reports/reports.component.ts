import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-reports',
  imports: [NavigationComponent],
  template: `
      <app-navigation></app-navigation>
    <p>
      reports works!
    </p>
  `,
  styles: ``
})
export class ReportsComponent {

}
