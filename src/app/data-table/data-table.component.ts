import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';


export interface TableContent {
  header: string;
  data: string;
}

@Component({
  selector: 'app-data-table',
  imports: [MatTableModule, MatTable, MatFormFieldModule, MatLabel, MatInput, MatSortModule, MatPaginatorModule],
  template: `
    <p>
      data-table works!
    </p>

    <mat-form-field>
      <mat-label>Filter</mat-label>
      <input matInput (keyup)="applyFilter($event)" placeholder="Search..." #filter>
    </mat-form-field>

    <table mat-table [dataSource]="data" matSort>
      @for(entry of columns; track entry) {
        <ng-container [matColumnDef]="entry.header">
          <th mat-header-cell *matHeaderCellDef>
            {{entry.header}}
          </th>
          <td mat-cell *matCellDef="let row">
            {{entry.data}}
          </td>
        </ng-container>
      }
      
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      


      <tr *matNoDataRow>
        <td colSpan="4"> No Data Matching the filter "{{filter.value}}"</td>
      </tr>
    </table>
      <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Select page of users"></mat-paginator>

  `,
  styles: ``
})
export class DataTableComponent implements AfterViewInit {
  displayedColumns: string[] = []; //FILL DIS BITCH

  @Input() columns: TableContent[] = [];
  @Input() data: any[] = [];



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tableData;

  constructor() {
    this.displayedColumns = this.columns.map(col => col.data);
    this.tableData = new MatTableDataSource(this.data);
  }


  ngAfterViewInit() {
    this.tableData.paginator = this.paginator;
    this.tableData.sort = this.sort;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();

    if(this.tableData.paginator) {
      this.tableData.paginator.firstPage();
    }
  }
}
