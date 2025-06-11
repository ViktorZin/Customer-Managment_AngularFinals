import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-confirm-dialog',
  imports: [/*BrowserAnimationsModule,*/ MatDialogModule, MatButtonModule],
  template: `
  <h2 mat-dialog-title>Bestätigen</h2>
  <mat-dialog-content>
  <p>Möchten Sie diesen Kunden wirklich löschen?</p>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button [mat-dialog-close]="false">Abbrechen</button>
    <button mat-button color="warn" [mat-dialog-close]="true">Löschen</button>
  </mat-dialog-actions> 
  `,
  styles: ``
})
export class ConfirmDialogComponent {

}
