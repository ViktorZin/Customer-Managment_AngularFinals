import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';


@Component({
  selector: 'app-home',
  imports: [NavigationComponent],
  template: `
    <app-navigation></app-navigation>
    <p>
      home works!
    </p>



  `,
  styles: ``
})
export class HomeComponent {

}
