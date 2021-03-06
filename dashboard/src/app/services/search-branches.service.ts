import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Branches } from '../models/branches';

@Injectable({
  providedIn: 'root'
})
export class SearchBranchesService {

  private branchesUrl = environment.branchesUrl;

  constructor(private http: HttpClient) { }

  /*searchBranches(id: number): Observable<Branches[]> {

    const url = `${this.branchesUrl}/${id}`;

    return this.http.get<Branches[]>(url, {term});
  }

  getBranches(): Observable<Branches[]> {
    return this.http.get<Branches[]>(this.branchesUrl)
    
    
  }*/
}
