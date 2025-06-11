import { Component } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  template: `
  <p>Möchten Sie diesen Kunden wirklich löschen?</p>
  <div>
    <button type="button">Abbrechen</button>
    <button type="button">Löschen</button>
  </div>
  `,
  styles: ``
})
export class ConfirmDialogComponent {

}
