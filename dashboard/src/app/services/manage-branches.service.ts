import { Injectable } from '@angular/core';
import { Observable, Operator } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Branches } from '../models/branches';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
/*interface Location {
  latitude: string;
  longtitude: string;
}*/

@Injectable({
  providedIn: 'root'
})
export class ManageBranchesService {
  private branchesUrl = environment.branchesUrl;

  constructor(private http: HttpClient) { }

  /*getLocation(){
    return this.http.get<Location>('https://api.ipapi.com/api/check?access_key=');
  }*/
  getBranches(): Observable<Branches[]> {
    return this.http.get<Branches[]>(this.branchesUrl);
  }

  createBranch(formBranch): Observable<any> {
    const url = `${this.branchesUrl}/${"create"}`;
    return this.http.post<any>(url, formBranch);
  }

  updateBranch(formBranch, ip: string): Observable<Branches[]> {
    const url = `${this.branchesUrl}/${ip}`;
    return this.http.post<Branches[]>(url, formBranch);
  }

  deleteBranch(ip: string): Observable<Branches> {
    const url = `${this.branchesUrl}/${ip}`;
    return this.http.delete<Branches>(url);
  }
}
