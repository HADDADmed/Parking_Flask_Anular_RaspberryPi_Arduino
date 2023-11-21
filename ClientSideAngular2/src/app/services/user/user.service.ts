import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
@Injectable({
  providedIn: 'root'
})
export class UserService {


   apiUrl = 'http://127.0.0.1:5000/users';
  constructor(
    private http: HttpClient
  ) { }


   getAllUsers() {
    return this.http.get<User[]>(this.apiUrl);


}
}
