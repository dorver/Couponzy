import { Injectable } from '@angular/core';
import { Observable, Operator } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Branches } from '../models/branches';

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
    return this.http.get<Branches[]>(this.branchesUrl)
    
    
  }
}
