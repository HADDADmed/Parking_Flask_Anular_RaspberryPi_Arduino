import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  public apiUrl = 'http://localhost:3000/users';
  constructor(
    private http: HttpClient
  ) { }

  public getAllUsers(){
    return this.http.get('http://localhost:3000/users');
  }







}
