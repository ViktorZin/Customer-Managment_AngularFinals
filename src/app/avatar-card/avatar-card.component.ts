import { Component } from '@angular/core';

@Component({
  selector: 'app-avatar-card',
  imports: [],
  template: `
    <div class="Avatar-card">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    .Avatar-card {
      height: 300px;
      width: 300px;
      background-color: magenta;
      border-style: solid;
      border-color: white;
      text-align: center;
      display: inline-block;
      vertical-align: middle;
    }
  
  `
})
export class AvatarCardComponent {

}
