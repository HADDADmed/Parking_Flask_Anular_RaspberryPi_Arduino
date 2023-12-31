import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';
import { UserResponse } from '../../interfaces/UserResponse';
import { USER_LOGIN_URL } from '../../constants/URLS';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

   constructor(private http: HttpClient,    private router: Router
    ) {}

  login(username: string, password: string) {
    console.log('2username: ' + username);
    console.log('2password: ' + password);

    return this.http
      .post<UserResponse>(USER_LOGIN_URL, {
        username: username,
        password: password,
      })
      .subscribe({
        next: (data ) => {
          console.log(data);
          if(data.status == 200){
            localStorage.setItem('user', JSON.stringify(data.user));
            console.log(data.user);
            if (data.isAdmin == true) {
              this.router.navigate(['/dashboard']);
            }
            else{
              this.router.navigate(['/user-dashboard']);
            }
          }
          else{
            alert(data.message);
          }
        },
        error: (error) => {
          console.error('Error in login request:', error);
        },
      });
  }
}
