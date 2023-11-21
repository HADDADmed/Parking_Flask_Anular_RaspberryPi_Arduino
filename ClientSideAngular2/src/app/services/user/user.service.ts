import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {


   apiUrl = 'http://127.0.0.1:5000/users';
  constructor(
    private http: HttpClient
  ) { }


   getAllUsers() : Observable<{ users: User[] }> 
    {
      return this.http.get<{ users: User[] }>(this.apiUrl);
}
}
