import { Component } from '@angular/core';

@Component({
  selector: 'app-avatar-card',
  imports: [],
  template: `
    <!-- a stylized avatar-card for either displaying customer images,
     or their initials in the customer window. reusable with ng-content-->
    <div class="avatar-card">
      <ng-content></ng-content>
    </div>
  `,
  styles: `
    .avatar-card {
      height: auto;
      width: auto;
      aspect-ratio: 1/1;
      background-color: gray;
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
