import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalesOpportunity } from './opportunities/opportunities.component';


@Injectable({
  providedIn: 'root'
})
export class OpportunityService {
  private apiUrl = 'http://localhost:3000/opportunities';
  
  
  constructor(private http: HttpClient) { }

  //returns the SalesOpportunity Array form the Database
  getItems(): Observable<SalesOpportunity[]> {
    return this.http.get<SalesOpportunity[]>(this.apiUrl);
  }
}
