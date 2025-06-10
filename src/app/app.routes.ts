import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerComponent } from './customer/customer.component';
import { OpportunitiesComponent } from './opportunities/opportunities.component';
import { ReportsComponent } from './reports/reports.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'customers',
        component: CustomersComponent,
        title: 'Customers'
    },
    {
        path: 'customer/:id',
        component: CustomerComponent,
        title: 'Customer'
    },
    {
        path: 'opportunities',
        component: OpportunitiesComponent,
        title: 'Opportunities'
    },
    {
        path: 'reports',
        component: ReportsComponent,
        title: 'Reports'
    },
    {
        path: '404',
        component: PageNotFoundComponent,
        title: '404 - Page Not Found'
    },
    {
        path: '**',
        redirectTo: '404'
    }
];
