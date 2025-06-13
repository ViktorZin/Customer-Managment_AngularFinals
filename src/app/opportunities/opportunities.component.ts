import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { DataTableComponent, TableContent } from '../data-table/data-table.component';

export interface SalesOpportunity {
  id: number;
  opportunityName: string;
  customerName: string;
  expectedRevenue: number;
  probability: number; // 0–100%
  status: 'Open' | 'In Progress' | 'Won' | 'Lost';
  expectedCloseDate: string; // ISO-Date string
}

@Component({
  selector: 'app-opportunities',
  imports: [NavigationComponent, DataTableComponent],
  template: `
      <app-navigation></app-navigation>
    <p>
      opportunities works!
    </p>

    <app-data-table
      [columns]="columnInfo",
      [data]="salesOpportunities"
    >

    </app-data-table>
  `,
  styles: ``
})
export class OpportunitiesComponent {

  //columnInfo;
/*
  columnInfo = [
    {header: 'id', data: 'Data01'},
    {header: 'opportunityName', data: 'Data02'},
    {header: 'customerName', data: 'Data03'},
    {header: 'expectedRevenue', data: 'Data04'},
    {header: 'probability', data: 'Data05'},
    {header: 'status', data: 'Data06'},
    {header: 'expectedCloseDate', data: 'Data07'},
  ]
*/

  columnInfo: TableContent[] = [
    {header: 'ID', data: 'id' },
    {header: 'opportunityName', data: 'opportunityName' },
    {header: 'customerName', data: 'customerName'},
    {header: 'expectedRevenue', data: 'expectedRevenue'},
    {header: 'probability', data: 'probability'},
    {header: 'status', data: 'status'},
    {header: 'expectedCloseDate', data: 'expectedCloseDate'},
  ]


  salesOpportunities: SalesOpportunity[] = [
  {
    id: 1,
    opportunityName: 'Website Redesign',
    customerName: 'Acme Corp',
    expectedRevenue: 25000,
    probability: 70,
    status: 'In Progress',
    expectedCloseDate: '2025-07-15'
  },
  {
    id: 2,
    opportunityName: 'CRM Integration',
    customerName: 'BetaTech Ltd.',
    expectedRevenue: 40000,
    probability: 50,
    status: 'Open',
    expectedCloseDate: '2025-08-01'
  },
  {
    id: 3,
    opportunityName: 'Cloud Migration',
    customerName: 'Gamma Industries',
    expectedRevenue: 60000,
    probability: 90,
    status: 'Won',
    expectedCloseDate: '2025-06-01'
  },
  {
    id: 4,
    opportunityName: 'Security Audit',
    customerName: 'Delta AG',
    expectedRevenue: 15000,
    probability: 20,
    status: 'Lost',
    expectedCloseDate: '2025-05-20'
  },
  {
    id: 5,
    opportunityName: 'AI Optimization Pilot',
    customerName: 'Epsilon Group',
    expectedRevenue: 50000,
    probability: 65,
    status: 'In Progress',
    expectedCloseDate: '2025-07-30'
  }];
}


