import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {


   apiUrl = 'http://127.0.0.1:5000/';

  constructor(
    private http: HttpClient
  ) { }


   getAllUsers() : Observable<{ users: User[] }> 
    {
      return this.http.get<{ users: User[] }>(this.apiUrl+"users");
}
saveUser(userData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/saveUser`, userData);
}
}
