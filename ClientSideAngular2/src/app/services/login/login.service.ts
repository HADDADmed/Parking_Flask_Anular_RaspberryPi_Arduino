import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';
import { UserResponse } from '../../interfaces/UserResponse';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://127.0.0.1:5000/';
   constructor(private http: HttpClient,    private router: Router
    ) {}

  login(username: string, password: string) {
    console.log('2username: ' + username);
    console.log('2password: ' + password);

    return this.http
      .post<UserResponse>(`${this.apiUrl}login`, {
        username: username,
        password: password,
      })
      .subscribe({
        next: (data ) => {
          console.log(data);

          if (data.isAdmin == true) {
            this.router.navigate(['/dashboard']);
          }
          else{
            this.router.navigate(['/user-dashboard']);
          }
        },
        error: (error) => {
          console.error('Error in login request:', error);
        },
      });
  }
}
