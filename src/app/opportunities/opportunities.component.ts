import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-opportunities',
  imports: [NavigationComponent],
  template: `
      <app-navigation></app-navigation>
    <p>
      opportunities works!
    </p>
  `,
  styles: ``
})
export class OpportunitiesComponent {

}
