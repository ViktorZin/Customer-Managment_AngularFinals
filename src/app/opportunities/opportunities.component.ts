import { DataTableComponent, TableContent } from '../data-table/data-table.component';
import { Component, AfterViewInit, ViewChild, inject } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { MatTable } from '@angular/material/table';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/input';
import { MatInput } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { OpportunityService } from '../opportunity.service';


export interface SalesOpportunity {
  id: number;
  opportunityName: string;
  customerName: string;
  expectedRevenue: number;
  probability: number; // 0–100%
  status: 'Open' | 'In Progress' | 'Won' | 'Lost';
  expectedCloseDate: string; // ISO-Date string
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-opportunities',
  imports: [NavigationComponent, MatTable, MatTableModule, MatFormFieldModule, MatLabel, MatInput, MatSortModule, MatPaginatorModule],
  template: `
      <app-navigation></app-navigation>
    <!--<app-data-table [columns]="columnInfo" [data]="placeholderData"></app-data-table>
-->
  <mat-form-field>
      <mat-label>Filter</mat-label>
      <input matInput (keyup)="applyFilter($event)" placeholder="Search..." #input>
</mat-form-field>


    <table mat-table [dataSource]="dataSource" matSort>

      @for(column of columns; track column){
        <ng-container [matColumnDef]="column.columnDef">
          <th mat-header-cell *matHeaderCellDef>
            {{column.header}}
          </th>
          <td mat-cell *matCellDef="let row">
            {{column.cell(row)}}
          </td>
        </ng-container>
      }

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

      <tr *matNoDataRow>
        <td colSpan="4"> No Data Matching the filter "{{input.value}}"</td>  
      </tr>
    </table>
      <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" aria-label="Select page of users"></mat-paginator>
  
    `,
  styles: ``
})
export class OpportunitiesComponent {
/*
    opportunities: SalesOpportunity[] = [
      {id: 0, opportunityName: 'opportunity1', customerName: 'Customer1', expectedRevenue: 12, probability: 50, status: 'In Progress', expectedCloseDate: '2026'},
      {id: 1, opportunityName: 'opportunity2', customerName: 'Customer2', expectedRevenue: 25, probability: 25, status: 'Open', expectedCloseDate: '2028'},
      {id: 2, opportunityName: 'opportunity3', customerName: 'Customer3', expectedRevenue: 300, probability: 78, status: 'In Progress', expectedCloseDate: '2026'},
      {id: 3, opportunityName: 'opportunity4', customerName: 'Customer4', expectedRevenue: 5000, probability: 1, status: 'In Progress', expectedCloseDate: '2025'},
      {id: 4, opportunityName: 'opportunity5', customerName: 'Customer5', expectedRevenue: 6, probability: 99, status: 'Won', expectedCloseDate: '2026'},
      {id: 5, opportunityName: 'opportunity6', customerName: 'Customer6', expectedRevenue: 7, probability: 88, status: 'Lost', expectedCloseDate: '2025'},
      {id: 6, opportunityName: 'opportunity7', customerName: 'Customer7', expectedRevenue: 22, probability: 45, status: 'Won', expectedCloseDate: '2027'},
      {id: 7, opportunityName: 'opportunity8', customerName: 'Customer8', expectedRevenue: 56, probability: 58, status: 'Lost', expectedCloseDate: '2026'},
      {id: 8, opportunityName: 'opportunity9', customerName: 'Customer9', expectedRevenue: 55, probability: 69, status: 'Won', expectedCloseDate: '2027'},
      {id: 9, opportunityName: 'opportunity10', customerName: 'Customer10', expectedRevenue: 32, probability: 8238, status: 'Open', expectedCloseDate: '2026'},
    ]

  customerService = inject(CustomerService);
  items = this.customerService.getCustomerList();
*/

opportunityService = inject(OpportunityService);
opportunities: SalesOpportunity[] = [];

displayedColumns: string[] = ['id', 'opportunityName', 'customerName', 'expectedRevenue', 'probability', 'status', 'expectedCloseDate'];
columns= [
    {
      columnDef: 'id',
      header: 'ID.',
      cell: (element: SalesOpportunity) => `${element.id}`,
    },
    {
      columnDef: 'opportunityName',
      header: 'Name',
      cell: (element: SalesOpportunity) => `${element.opportunityName}`,
    },
    {
      columnDef: 'customerName',
      header: 'Customer',
      cell: (element: SalesOpportunity) => `${element.customerName}`,
    },
    {
      columnDef: 'expectedRevenue',
      header: 'Exp. Revenue',
      cell: (element: SalesOpportunity) => `${element.expectedRevenue}`,
    },
    {
      columnDef: 'probability',
      header: 'Probability',
      cell: (element: SalesOpportunity) => `${element.probability}`,
    },
    {
      columnDef: 'status',
      header: 'Status',
      cell: (element: SalesOpportunity) => `${element.status}`,
    },
    {
      columnDef: 'expectedCloseDate',
      header: 'Exp. Close Date',
      cell: (element: SalesOpportunity) => `${element.expectedCloseDate}`,
    },
  ];

  dataSource!: MatTableDataSource<SalesOpportunity>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.opportunityService.getItems().subscribe(data => {
      this.opportunities = data;
      this.dataSource = new MatTableDataSource(this.opportunities);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


