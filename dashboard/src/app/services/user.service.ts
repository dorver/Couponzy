import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/users';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})


export class UserService {
  private UsersUrl = environment.usersUrl;
  

  constructor(private http: HttpClient) { }

  getUser(email:string,password:string): Observable<User> {
    const url=`${this.UsersUrl}/${email}&${password}`
    return this.http.get<User>(url);
  }
}