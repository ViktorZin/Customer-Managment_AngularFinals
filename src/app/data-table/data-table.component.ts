import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatLabel } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';


export interface TableContent {
  header: string;
  dataKey: string;
  cell: (row: any) => string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatTable,/*MatLabel, MatInput,*/ MatFormFieldModule, MatSortModule, MatPaginatorModule],
  template: `
    <p>
      data-table displays something at least.
    </p>


    @for(entries of columns; track entries) {
      <p>{{entries.header}} {{entries.dataKey}}  {{entries.cell}}</p>
    }

    @for(point of data; track point.id) {
      <p>{{point.id}}, {{point.stuff}}</p>
    }

    @for(c of displayedColumns; track c) {
      <p>DisplayedColumn: {{c}}</p>
    }


    <table mat-table [dataSource]="dataSource">
      @for(column of internalColumns; track column) {
        <ng-container [matColumnDef]="column.header">
          <th mat-header-cell *matHeaderCellDef>
            {{column.header}}
          </th>
          <td mat-cell *matCellDef="let row">
            {{column.cell(row)}}
          </td>
        </ng-container>
      }

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; internalColumns: displayedColumns"></tr>
    </table>

  `,
  styles: ``
})
export class DataTableComponent implements AfterViewInit {
  displayedColumns: string[] = []; 

  @Input() columns: TableContent[] = [];
  @Input() data: any[] = [];

  internalColumns: TableContent[] = [
    {
      header: 'ID',
      dataKey: 'id',
      cell: row => `${row.id}`
    },
    {
      header: 'STUFF',
      dataKey: 'stuff',
      cell: row => `${row.stuff}`
    },
  ];

  internalData = [
    {id: 0, stuff: 'myStuff00'},
    {id: 1, stuff: 'myStuff01'},
    {id: 2, stuff: 'myStuff02'}
  ];



  dataSource!: MatTableDataSource<any>;
  constructor() {
    this.displayedColumns = this.internalColumns.map(c => c.header);
  }

  ngOnInit() {
    //this.dataSource = new MatTableDataSource(this.data);
    //this.displayedColumns = this.columns.map(c => c.header);
  }


  ngAfterViewInit() {
   this.dataSource = new MatTableDataSource(this.internalData);
    
  }

  
}
