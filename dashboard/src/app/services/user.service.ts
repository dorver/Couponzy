import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../models/users';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})


export class UserService {
  private UsersUrl = environment.adminssUrl;
  

  constructor(private http: HttpClient) { }

  getUser(email:string,password:string): Observable<Users> {
    const url=`${this.UsersUrl}/${email}&${password}`
    return this.http.get<Users>(url);
  }
}