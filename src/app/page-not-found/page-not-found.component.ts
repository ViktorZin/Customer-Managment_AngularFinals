import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-page-not-found',
  imports: [NavigationComponent],
  template: `
      <app-navigation></app-navigation>
    <p>
      page-not-found works!
    </p>
  `,
  styles: ``
})
export class PageNotFoundComponent {

}
