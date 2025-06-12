import { Component } from '@angular/core';

@Component({
  selector: 'app-avatar-card',
  imports: [],
  template: `
    <div class="avatar-card">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    .avatar-card {
      height: auto;
      width: auto;
      aspect-ratio: 1/1;
      background-color: magenta;
      border-style: solid;
      border-color: black;
      text-align: center;
      display: inline-block;
      vertical-align: middle;
    }

    .avatar-card, * {
      object-fit: cover;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      font-size: 50pt;
    }


  
  `
})
export class AvatarCardComponent {

}
